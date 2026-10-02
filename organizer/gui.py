"""GUI: 정리할 폴더를 자동으로 읽어 분류 미리보기 -> 한 번에 정리, 자동 감시, 이동 기록(되돌리기)."""
from __future__ import annotations

import os
import queue
import subprocess
import sys
import threading
import time
import tkinter as tk
from pathlib import Path
from tkinter import filedialog, messagebox, simpledialog, ttk

from . import ai as ai_mod
from .core import (Move, apply_plan, build_plan, ensure_config, list_history,
                   load_config, load_state, sanitize_folder, save_state, scan,
                   stable_files, undo)

try:
    from tkinterdnd2 import DND_FILES, TkinterDnD
    HAS_DND = True
except ImportError:  # pip install tkinterdnd2
    HAS_DND = False

TICK_MS = 10_000  # 폴더 확인 주기


class App:
    def __init__(self):
        self.root = TkinterDnD.Tk() if HAS_DND else tk.Tk()
        self.root.title("AI 폴더 정리기 - 대학원생 버전")
        self.root.geometry("900x640")
        load_config()
        st = load_state()
        self.sources: list[str] = list(st["sources"])
        self.dest = tk.StringVar(value=st["dest"])
        self.recursive = tk.BooleanVar(value=st["recursive"])
        self.auto_watch = tk.BooleanVar(value=False)  # 안전을 위해 항상 꺼진 상태로 시작
        self.use_ai = tk.BooleanVar(value=st["use_ai"] and ai_mod.available())
        self.search = tk.StringVar()
        self.plan: list[Move] = []
        self.extra: list[Path] = []          # 드래그로 추가한 1회성 파일/폴더
        self.overrides: dict[Path, tuple[str, bool]] = {}  # 사용자가 고친 폴더/제외
        self.last_key: tuple = ()
        self.busy = False
        self.q: queue.Queue = queue.Queue()

        self._build()
        self.root.after(100, self._poll)
        self.root.after(300, self.refresh)
        self.root.after(TICK_MS, self._tick)

    # ---------- 화면 ----------
    def _build(self):
        top = ttk.LabelFrame(self.root, text="설정", padding=6)
        top.pack(fill="x", padx=8, pady=(8, 0))
        r1 = ttk.Frame(top)
        r1.pack(fill="x")
        ttk.Label(r1, text="정리할 폴더(자동으로 읽음):").pack(side="left", anchor="n")
        self.src_list = tk.Listbox(r1, height=3, exportselection=False)
        self.src_list.pack(side="left", fill="x", expand=True, padx=4)
        b = ttk.Frame(r1)
        b.pack(side="left")
        ttk.Button(b, text="폴더 추가", command=self.add_source).pack(fill="x")
        ttk.Button(b, text="제거", command=self.remove_source).pack(fill="x", pady=2)
        r2 = ttk.Frame(top)
        r2.pack(fill="x", pady=4)
        ttk.Label(r2, text="정리된 파일 저장 위치:").pack(side="left")
        ttk.Entry(r2, textvariable=self.dest).pack(side="left", fill="x", expand=True, padx=4)
        ttk.Button(r2, text="찾아보기", command=self.pick_dest).pack(side="left")
        r3 = ttk.Frame(top)
        r3.pack(fill="x")
        ttk.Checkbutton(r3, text="하위폴더 포함", variable=self.recursive,
                        command=self.on_option).pack(side="left")
        ttk.Checkbutton(r3, text="AI 분류", variable=self.use_ai, command=self.on_option,
                        state="normal" if ai_mod.available() else "disabled").pack(side="left", padx=10)
        ttk.Checkbutton(r3, text="새 파일 자동 정리 (확실한 것만, 10초마다)",
                        variable=self.auto_watch, command=self.on_auto).pack(side="left")
        self._refresh_src_list()

        self.nb = ttk.Notebook(self.root)
        self.nb.pack(fill="both", expand=True, padx=8, pady=6)
        self._build_plan_tab()
        self._build_history_tab()
        self.nb.bind("<<NotebookTabChanged>>", lambda e: self.refresh_history())

        self.status = ttk.Label(self.root, text="준비됨")
        self.status.pack(fill="x", padx=8, pady=(0, 6))

    def _build_plan_tab(self):
        tab = ttk.Frame(self.nb)
        self.nb.add(tab, text="  정리  ")
        msg = "(선택) 다른 파일/폴더를 이 칸에 끌어놓으면 1회 추가됩니다" if HAS_DND else \
            "드래그 기능: pip install tkinterdnd2  (지금은 '파일 추가' 사용)"
        drop = tk.Label(tab, text=msg, relief="groove", height=2, bg="#eef3fb")
        drop.pack(fill="x", pady=(4, 4))
        if HAS_DND:
            drop.drop_target_register(DND_FILES)
            drop.dnd_bind("<<Drop>>", lambda e: self.add_extra(self.root.tk.splitlist(e.data)))

        cols = ("file", "folder", "reason", "where")
        self.tree = ttk.Treeview(tab, columns=cols, show="headings", selectmode="extended")
        for c, t, w in (("file", "파일", 250), ("folder", "이동할 폴더 (더블클릭=수정)", 220),
                        ("reason", "이유", 170), ("where", "현재 위치", 220)):
            self.tree.heading(c, text=t)
            self.tree.column(c, width=w)
        sb = ttk.Scrollbar(tab, command=self.tree.yview)
        self.tree.configure(yscrollcommand=sb.set)
        sb.pack(side="right", fill="y")
        self.tree.pack(fill="both", expand=True)
        self.tree.bind("<Double-1>", self.edit_folder)

        bar2 = ttk.Frame(tab)
        bar2.pack(fill="x", pady=4)
        ttk.Button(bar2, text="지금 새로 읽기", command=lambda: self.refresh(force=True)).pack(side="left")
        ttk.Button(bar2, text="파일 추가", command=self.pick_files).pack(side="left", padx=4)
        ttk.Button(bar2, text="선택 제외", command=self.exclude).pack(side="left")
        ttk.Button(bar2, text="규칙 편집", command=self.edit_rules).pack(side="left", padx=4)
        ttk.Button(bar2, text="규칙 새로고침", command=self.reload_rules).pack(side="left")
        ttk.Button(bar2, text="전체 정리 실행", command=self.apply).pack(side="right")

    def _build_history_tab(self):
        tab = ttk.Frame(self.nb)
        self.nb.add(tab, text="  이동 기록  ")
        row = ttk.Frame(tab)
        row.pack(fill="x", pady=4)
        ttk.Label(row, text="검색:").pack(side="left")
        e = ttk.Entry(row, textvariable=self.search)
        e.pack(side="left", fill="x", expand=True, padx=4)
        self.search.trace_add("write", lambda *_: self.refresh_history())
        ttk.Button(row, text="새로고침", command=self.refresh_history).pack(side="left")

        cols = ("a", "b", "c")
        self.hist = ttk.Treeview(tab, columns=cols, selectmode="extended")
        self.hist.heading("#0", text="날짜 / 파일")
        self.hist.column("#0", width=330)
        for c, t, w in (("a", "이동한 폴더", 260), ("b", "방식 / 개수", 120), ("c", "상태", 100)):
            self.hist.heading(c, text=t)
            self.hist.column(c, width=w)
        sb = ttk.Scrollbar(tab, command=self.hist.yview)
        self.hist.configure(yscrollcommand=sb.set)
        sb.pack(side="right", fill="y")
        self.hist.pack(fill="both", expand=True)
        row2 = ttk.Frame(tab)
        row2.pack(fill="x", pady=4)
        ttk.Label(row2, text="날짜 줄 선택 = 그때 정리한 전체 / 파일 줄 선택 = 그 파일만").pack(side="left")
        ttk.Button(row2, text="선택 되돌리기", command=self.undo_selected).pack(side="right")
        ttk.Button(row2, text="저장 폴더 열기", command=self.open_dest).pack(side="right", padx=4)
        self.hist_data: list[dict] = []

    # ---------- 설정/상태 ----------
    def _save(self):
        save_state({"sources": self.sources, "dest": self.dest.get(), "recursive": self.recursive.get(),
                    "use_ai": self.use_ai.get(), "auto_watch": False})

    def _refresh_src_list(self):
        self.src_list.delete(0, "end")
        for s in self.sources:
            self.src_list.insert("end", s)

    def add_source(self):
        d = filedialog.askdirectory(title="정리할 폴더 선택 (예: D:\\ 또는 다운로드)")
        if d and d not in self.sources:
            self.sources.append(d)
            self._refresh_src_list()
            self._save()
            self.refresh(force=True)

    def remove_source(self):
        for i in reversed(self.src_list.curselection()):
            del self.sources[i]
        self._refresh_src_list()
        self._save()
        self.refresh(force=True)

    def pick_dest(self):
        d = filedialog.askdirectory()
        if d:
            self.dest.set(d)
            self._save()
            self.refresh(force=True)
            self.refresh_history()

    def on_option(self):
        self._save()
        self.refresh(force=True)

    def on_auto(self):
        if self.auto_watch.get():
            if not messagebox.askyesno(
                    "자동 정리 켜기",
                    "정리할 폴더에 새 파일이 생기면 10초 안에 자동으로 옮깁니다.\n"
                    "· 분류가 확실한 파일만 옮기고, 애매한 파일은 그대로 둡니다.\n"
                    "· 모든 이동은 '이동 기록' 탭에서 되돌릴 수 있습니다.\n"
                    "· 이 창이 열려 있는 동안만 동작합니다.\n\n켤까요?"):
                self.auto_watch.set(False)
                return
            self.status.config(text="자동 정리 켜짐 (창을 닫으면 멈춥니다)")
        else:
            self.status.config(text="자동 정리 꺼짐")

    # ---------- 폴더 읽기 / 미리보기 ----------
    def _targets(self) -> list[Path]:
        return [Path(s) for s in self.sources] + list(self.extra)

    def refresh(self, force: bool = False):
        """정리할 폴더를 읽어 분류 미리보기를 만든다. 파일 목록이 그대로면 다시 계산하지 않음."""
        if self.busy:
            return
        self.busy = True
        self.status.config(text="폴더 내용을 읽는 중...")
        targets, dest = self._targets(), Path(self.dest.get())
        rec, use_ai = self.recursive.get(), self.use_ai.get()

        def work():
            try:
                files = scan(targets, dest, rec)
                key = tuple(sorted(map(str, files)))
                if key == self.last_key and not force:
                    self.q.put(lambda: self._shown(None, key))
                    return
                clf = ai_mod.ClaudeClassifier() if use_ai and ai_mod.available() else None
                self.q.put(lambda: self._shown(build_plan(files, dest, clf), key))
            except Exception as e:  # noqa: BLE001 - 화면에 알림
                self.q.put(lambda: self._failed(e))

        threading.Thread(target=work, daemon=True).start()

    def _failed(self, e):
        self.busy = False
        self.status.config(text=f"오류: {e}")

    def _shown(self, plan, key):
        self.busy = False
        if plan is None:
            self.status.config(text=self._summary())
            return
        self.last_key = key
        for m in plan:
            if m.src in self.overrides:
                m.dst_folder, m.skip = self.overrides[m.src]
                m.reason = "직접 지정" if not m.skip else ""
        self.plan = plan
        self._fill_tree()
        self.status.config(text=self._summary())

    def _summary(self):
        n = sum(not m.skip for m in self.plan)
        return f"{n}개 파일 분류됨 - 확인 후 '전체 정리 실행'  ({time.strftime('%H:%M:%S')} 확인)" if n \
            else f"정리할 파일이 없습니다 ({time.strftime('%H:%M:%S')} 확인)"

    def _fill_tree(self):
        self.tree.delete(*self.tree.get_children())
        for i, m in enumerate(self.plan):
            folder = "(제외)" if m.skip else m.dst_folder
            self.tree.insert("", "end", iid=str(i),
                             values=(m.src.name, folder, "" if m.skip else m.reason, str(m.src.parent)))

    def pick_files(self):
        self.add_extra(self.root.tk.splitlist(filedialog.askopenfilenames()))

    def add_extra(self, paths):
        new = [Path(p) for p in paths if Path(p) not in self.extra]
        if new:
            self.extra += new
            self.refresh(force=True)

    # ---------- 편집 / 실행 ----------
    def edit_folder(self, _):
        sel = self.tree.selection()
        if not sel:
            return
        m = self.plan[int(sel[0])]
        new = simpledialog.askstring("폴더 수정", "이동할 폴더 (새 이름이면 자동 생성):",
                                     initialvalue=m.dst_folder, parent=self.root)
        if new:
            m.dst_folder, m.skip, m.reason = sanitize_folder(new), False, "직접 지정"
            self.overrides[m.src] = (m.dst_folder, False)
            self._fill_tree()

    def exclude(self):
        for iid in self.tree.selection():
            m = self.plan[int(iid)]
            m.skip = True
            self.overrides[m.src] = (m.dst_folder, True)
        self._fill_tree()
        self.status.config(text=self._summary())

    def apply(self):
        todo = [m for m in self.plan if not m.skip]
        if not todo:
            return
        if not messagebox.askyesno("확인", f"{len(todo)}개 파일을\n{self.dest.get()}\n로 이동합니다. 계속할까요?\n"
                                          "('이동 기록' 탭에서 되돌릴 수 있습니다)"):
            return
        apply_plan(self.plan, Path(self.dest.get()), "manual")
        self.extra.clear()
        self.overrides.clear()
        self.refresh(force=True)
        self.refresh_history()
        self.status.config(text=f"{len(todo)}개 이동 완료. '이동 기록' 탭에서 확인/되돌리기")

    def edit_rules(self):
        path = ensure_config()
        if sys.platform == "win32":
            os.startfile(path)  # 메모장 등 기본 편집기로 열기
        else:
            subprocess.Popen(["xdg-open", str(path)])
        self.status.config(text="저장 후 '규칙 새로고침'을 누르세요: " + str(path))

    def reload_rules(self):
        errs = load_config()
        if errs:
            messagebox.showwarning("규칙 오류", "\n".join(errs))
        self.refresh(force=True)

    # ---------- 자동 감시 ----------
    def _tick(self):
        self.root.after(TICK_MS, self._tick)
        if self.busy:
            return
        if self.auto_watch.get():
            self._auto_move()
        else:
            self.refresh()

    def _auto_move(self):
        self.busy = True
        targets, dest = self._targets(), Path(self.dest.get())
        rec, use_ai = self.recursive.get(), self.use_ai.get()

        def work():
            try:
                files = stable_files(scan(targets, dest, rec))
                clf = ai_mod.ClaudeClassifier() if use_ai and ai_mod.available() else None
                excluded = {p for p, (_, skip) in self.overrides.items() if skip}  # 사용자가 제외한 파일
                plan = [m for m in build_plan(files, dest, clf)
                        if m.source != "fallback" and m.src not in excluded]
                if plan:
                    apply_plan(plan, dest, "auto")
                n = len(plan)
                self.q.put(lambda: self._auto_done(n))
            except Exception as e:  # noqa: BLE001
                self.q.put(lambda: self._failed(e))

        threading.Thread(target=work, daemon=True).start()

    def _auto_done(self, n):
        self.busy = False
        self.refresh(force=True)
        if n:
            self.refresh_history()
            self.status.config(text=f"[자동] {n}개 이동됨 ({time.strftime('%H:%M:%S')}) - 이동 기록에서 확인")

    # ---------- 이동 기록 ----------
    def refresh_history(self):
        if not hasattr(self, "hist"):
            return
        q = self.search.get().strip().lower()
        self.hist_data = list_history(Path(self.dest.get()))
        self.hist.delete(*self.hist.get_children())
        for ri, h in enumerate(self.hist_data):
            rows = [(i, it) for i, it in enumerate(h["items"])
                    if not q or q in Path(it["dst"]).name.lower() or q in it["folder"].lower()
                    or q in h["time"]]
            if not rows:
                continue
            undone = sum(it["undone"] for it in h["items"])
            state = "전체 되돌림" if undone == len(h["items"]) else (f"{undone}개 되돌림" if undone else "")
            kind = "자동" if h.get("source") == "auto" else "수동"
            self.hist.insert("", "end", iid=f"r{ri}", text=h["time"], open=bool(q),
                             values=("", f"{kind} · {len(h['items'])}개", state))
            for i, it in rows:
                self.hist.insert(f"r{ri}", "end", iid=f"r{ri}:{i}", text=Path(it["dst"]).name,
                                 values=(it["folder"], "", "되돌림" if it["undone"] else ""))

    def undo_selected(self):
        runs: dict[int, set[int] | None] = {}
        for iid in self.hist.selection():
            if ":" in iid:
                r, i = iid[1:].split(":")
                if runs.get(int(r), set()) is not None:
                    runs.setdefault(int(r), set()).add(int(i))
            else:
                runs[int(iid[1:])] = None  # 날짜 줄 = 전체
        if not runs:
            messagebox.showinfo("되돌리기", "되돌릴 항목(날짜 줄 또는 파일 줄)을 선택하세요.")
            return
        if not messagebox.askyesno("확인", "선택한 항목을 원래 위치로 되돌릴까요?"):
            return
        ok = skipped = 0
        for r, idx in runs.items():
            o, s = undo(self.hist_data[r]["path"], idx)
            ok, skipped = ok + o, skipped + s
        self.refresh_history()
        self.refresh(force=True)
        self.status.config(text=f"{ok}개 원위치, {skipped}개 건너뜀(파일이 이미 없거나 옮겨짐)")

    def open_dest(self):
        d = Path(self.dest.get())
        d.mkdir(parents=True, exist_ok=True)
        if sys.platform == "win32":
            os.startfile(d)
        else:
            subprocess.Popen(["xdg-open", str(d)])

    # ---------- 스레드 결과 처리 ----------
    def _poll(self):
        try:
            while True:
                self.q.get_nowait()()
        except queue.Empty:
            pass
        self.root.after(100, self._poll)


def run():
    App().root.mainloop()
