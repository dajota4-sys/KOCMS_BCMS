"""드래그&드롭 GUI. 파일/폴더를 창에 끌어놓으면 분류 미리보기 -> 확인 후 이동."""
from __future__ import annotations

import threading
import tkinter as tk
from pathlib import Path
from tkinter import filedialog, messagebox, simpledialog, ttk

from . import ai as ai_mod
import os
import subprocess
import sys

from .core import (Move, apply_plan, build_plan, ensure_config, latest_journal,
                   load_config, sanitize_folder, scan, undo)

try:
    from tkinterdnd2 import DND_FILES, TkinterDnD
    HAS_DND = True
except ImportError:  # pip install tkinterdnd2
    HAS_DND = False


class App:
    def __init__(self):
        self.root = TkinterDnD.Tk() if HAS_DND else tk.Tk()
        self.root.title("AI 폴더 정리기 - 대학원생 버전")
        self.root.geometry("820x560")
        self.dest = tk.StringVar(value=str(Path.home() / "대학원_정리"))
        self.use_ai = tk.BooleanVar(value=ai_mod.available())
        self.recursive = tk.BooleanVar(value=False)
        self.plan: list[Move] = []
        load_config()

        top = ttk.Frame(self.root, padding=8)
        top.pack(fill="x")
        ttk.Label(top, text="정리 폴더:").pack(side="left")
        ttk.Entry(top, textvariable=self.dest, width=45).pack(side="left", padx=4)
        ttk.Button(top, text="찾아보기", command=self.pick_dest).pack(side="left")
        ttk.Checkbutton(top, text="AI 분류", variable=self.use_ai,
                        state="normal" if ai_mod.available() else "disabled").pack(side="left", padx=8)
        ttk.Checkbutton(top, text="하위폴더 포함", variable=self.recursive).pack(side="left")

        msg = "여기에 파일/폴더를 끌어놓으세요" if HAS_DND else \
            "드래그 기능: pip install tkinterdnd2  (지금은 '추가' 버튼 사용)"
        self.drop = tk.Label(self.root, text=msg, relief="groove", height=4,
                             bg="#eef3fb", font=("", 12))
        self.drop.pack(fill="x", padx=8, pady=4)
        if HAS_DND:
            self.drop.drop_target_register(DND_FILES)
            self.drop.dnd_bind("<<Drop>>", self.on_drop)
        else:
            self.drop.bind("<Button-1>", lambda e: self.pick_files())

        cols = ("file", "folder", "reason")
        self.tree = ttk.Treeview(self.root, columns=cols, show="headings")
        for c, t, w in (("file", "파일", 300), ("folder", "이동할 폴더 (더블클릭=수정)", 250), ("reason", "이유", 200)):
            self.tree.heading(c, text=t)
            self.tree.column(c, width=w)
        self.tree.pack(fill="both", expand=True, padx=8)
        self.tree.bind("<Double-1>", self.edit_folder)

        bar = ttk.Frame(self.root, padding=8)
        bar.pack(fill="x")
        ttk.Button(bar, text="파일 추가", command=self.pick_files).pack(side="left")
        ttk.Button(bar, text="폴더 추가", command=self.pick_folder).pack(side="left", padx=4)
        ttk.Button(bar, text="선택 제외", command=self.exclude).pack(side="left")
        ttk.Button(bar, text="규칙 편집", command=self.edit_rules).pack(side="left", padx=4)
        ttk.Button(bar, text="규칙 새로고침", command=self.reload_rules).pack(side="left")
        ttk.Button(bar, text="되돌리기", command=self.undo_last).pack(side="right")
        ttk.Button(bar, text="정리 실행", command=self.apply).pack(side="right", padx=4)
        self.status = ttk.Label(self.root, text="준비됨 (먼저 미리보기만 표시되며, 실행 전에는 아무것도 옮기지 않습니다)")
        self.status.pack(fill="x", padx=8, pady=(0, 6))

    # --- 입력 ---
    def pick_dest(self):
        d = filedialog.askdirectory()
        if d:
            self.dest.set(d)

    def pick_files(self):
        self.add_sources(self.root.tk.splitlist(filedialog.askopenfilenames()))

    def pick_folder(self):
        d = filedialog.askdirectory()
        if d:
            self.add_sources([d])

    def on_drop(self, event):
        self.add_sources(self.root.tk.splitlist(event.data))

    def add_sources(self, paths):
        paths = [Path(p) for p in paths]
        if not paths:
            return
        self.status.config(text="분류 중...")
        dest, rec, use_ai = Path(self.dest.get()), self.recursive.get(), self.use_ai.get()

        def work():
            try:
                files = scan(paths, dest, rec)
                clf = ai_mod.ClaudeClassifier() if use_ai and ai_mod.available() else None
                new = build_plan(files, dest, clf)
            except Exception as e:
                self.root.after(0, lambda: messagebox.showerror("오류", str(e)))
                return
            self.root.after(0, lambda: self.show(new))

        threading.Thread(target=work, daemon=True).start()

    def show(self, new):
        seen = {m.src for m in self.plan}
        self.plan += [m for m in new if m.src not in seen]
        self.tree.delete(*self.tree.get_children())
        for i, m in enumerate(self.plan):
            self.tree.insert("", "end", iid=str(i), values=(m.src.name, m.dst_folder, m.reason))
        self.status.config(text=f"{len(self.plan)}개 파일 분류됨 - 확인 후 '정리 실행'")

    # --- 규칙 설정 ---
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
        self.status.config(text="규칙을 다시 불러왔습니다. 파일을 다시 끌어놓으면 새 규칙이 적용됩니다.")

    # --- 편집/실행 ---
    def edit_folder(self, _):
        sel = self.tree.selection()
        if not sel:
            return
        m = self.plan[int(sel[0])]
        new = simpledialog.askstring("폴더 수정", "이동할 폴더 (새 이름이면 자동 생성):",
                                     initialvalue=m.dst_folder, parent=self.root)
        if new:
            m.dst_folder, m.reason = sanitize_folder(new), "직접 지정"
            self.tree.item(sel[0], values=(m.src.name, m.dst_folder, m.reason))

    def exclude(self):
        for iid in self.tree.selection():
            self.plan[int(iid)].skip = True
            self.tree.item(iid, values=(self.plan[int(iid)].src.name, "(제외)", ""))

    def apply(self):
        todo = [m for m in self.plan if not m.skip]
        if not todo:
            return
        if not messagebox.askyesno("확인", f"{len(todo)}개 파일을\n{self.dest.get()}\n로 이동합니다. 계속할까요?\n(되돌리기 가능)"):
            return
        apply_plan(self.plan, Path(self.dest.get()))
        self.plan.clear()
        self.tree.delete(*self.tree.get_children())
        self.status.config(text=f"{len(todo)}개 이동 완료. 되돌리려면 '되돌리기'")

    def undo_last(self):
        j = latest_journal(Path(self.dest.get()))
        if not j:
            messagebox.showinfo("되돌리기", "되돌릴 기록이 없습니다.")
            return
        ok, sk = undo(j)
        j.rename(j.with_suffix(".undone"))
        self.status.config(text=f"{ok}개 원위치, {sk}개 건너뜀")


def run():
    App().root.mainloop()
