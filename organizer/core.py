"""분류 규칙, 이동 계획, 실행/되돌리기 로직 (GUI와 무관)."""
from __future__ import annotations

import copy
import json
import os
import re
import shutil
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Callable, Iterable, Optional

# 카테고리 폴더 (번호 접두사로 정렬 고정)
CATEGORIES = {
    "papers": "01_논문",
    "lectures": "02_강의자료",
    "assignments": "03_과제",
    "thesis": "04_학위논문",
    "research": "05_연구_데이터코드",
    "presentations": "06_발표_학회",
    "admin": "07_행정_서류",
    "books": "08_도서",
    "images": "09_이미지",
    "archives": "10_압축_설치파일",
    "media": "11_영상_음성",
    "misc": "99_미분류",
}

# (카테고리 키, 정규식) - 파일명에 매칭되면 신뢰도 높음
KEYWORD_RULES = [
    ("thesis", r"thesis|dissertation|학위\s*논문|심사|프로포절|proposal"),
    ("assignments", r"homework|\bhw[\s_\-]?\d|assignment|과제|레포트|리포트|report|제출"),
    ("lectures", r"lecture|slides?|syllabus|강의|수업|강의계획|\bweek[\s_\-]?\d|\bch(apter)?[\s_\-]?\d"),
    ("papers", r"arxiv|\bdoi\b|journal|\bet[\s_\-]al|논문|\bpaper\b|proceedings|preprint"),
    ("presentations", r"presentation|poster|발표|학회|conference|symposium|세미나|seminar"),
    ("admin", r"장학|등록|성적|증명서|신청서|계약|영수증|invoice|scholarship|지원서|공문|근로"),
    ("books", r"\bbook\b|ebook|도서|교재|textbook"),
    ("research", r"\bdata\b|dataset|실험|분석|survey|설문|코드북|codebook"),
]

EXT_RULES = {
    "research": {".csv", ".xlsx", ".xls", ".ipynb", ".py", ".r", ".rmd", ".m", ".sav",
                 ".dta", ".json", ".mat", ".h5", ".sas", ".do", ".tex", ".bib", ".sql"},
    "presentations": {".pptx", ".ppt", ".key"},
    "books": {".epub", ".mobi"},
    "images": {".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp", ".svg", ".heic", ".tif", ".tiff"},
    "archives": {".zip", ".7z", ".rar", ".tar", ".gz", ".iso", ".msi", ".dmg", ".pkg"},
    "media": {".mp4", ".mkv", ".avi", ".mov", ".mp3", ".wav", ".m4a", ".flac"},
}

# 문서류는 확장자만으로 용도를 알 수 없음 -> AI 또는 미분류
AMBIGUOUS_EXT = {".pdf", ".docx", ".doc", ".hwp", ".hwpx", ".txt", ".md", ".rtf", ".odt"}

# 절대 옮기지 않는 파일/폴더
SKIP_EXT = {".exe", ".dll", ".sys", ".lnk", ".ini", ".bat", ".cmd", ".com", ".scr", ".tmp", ".part", ".crdownload"}
SKIP_DIRS = {"$recycle.bin", "system volume information", "windows", "program files",
             "program files (x86)", "programdata", ".git", ".svn", "node_modules",
             "__pycache__", ".venv", "venv", "env", ".idea", ".vscode", "recovery"}
PROJECT_MARKERS = {".git", "pyproject.toml", "package.json", "requirements.txt",
                   "setup.py", "Makefile", "CMakeLists.txt", ".Rproj"}
JOURNAL_DIR = ".organizer_journal"

# ---- 사용자 설정 (메모장으로 편집 가능한 JSON) ----
_DEFAULTS = {
    "categories": copy.deepcopy(CATEGORIES),
    "keywords": {k: v for k, v in KEYWORD_RULES},
    "extensions": {k: sorted(v) for k, v in EXT_RULES.items()},
}


def config_path() -> Path:
    env = os.environ.get("AIFOLDER_CONFIG")
    if env:
        return Path(env)
    base = os.environ.get("APPDATA") or str(Path.home() / ".config")
    return Path(base) / "AIFolderOrganizer" / "config.json"


def ensure_config(path: Optional[Path] = None) -> Path:
    """설정 파일이 없으면 기본값으로 생성하고 경로를 반환."""
    path = Path(path) if path else config_path()
    if not path.exists():
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(_DEFAULTS, ensure_ascii=False, indent=2), encoding="utf-8")
    return path


def load_config(path: Optional[Path] = None) -> list[str]:
    """설정 파일을 읽어 분류 규칙에 반영(없으면 기본값). 오류 메시지 목록 반환."""
    path = Path(path) if path else config_path()
    errors: list[str] = []
    cfg = copy.deepcopy(_DEFAULTS)
    if path.exists():
        try:
            user = json.loads(path.read_text(encoding="utf-8"))
            for sect in cfg:
                if isinstance(user.get(sect), dict):
                    cfg[sect] = user[sect]
        except (ValueError, OSError) as e:
            errors.append(f"설정 파일을 읽을 수 없어 기본값을 사용합니다: {e}")
    CATEGORIES.clear()
    CATEGORIES.update({k: str(v) for k, v in cfg["categories"].items()})
    CATEGORIES.setdefault("misc", "99_미분류")
    KEYWORD_RULES.clear()
    for key, pat in cfg["keywords"].items():
        try:
            re.compile(pat)
        except re.error as e:
            errors.append(f"키워드 '{key}' 정규식 오류(무시됨): {e}")
            continue
        if key in CATEGORIES:
            KEYWORD_RULES.append((key, pat))
        else:
            errors.append(f"키워드 '{key}'는 categories에 없어 무시됩니다")
    EXT_RULES.clear()
    for key, exts in cfg["extensions"].items():
        if key in CATEGORIES and isinstance(exts, list):
            EXT_RULES[key] = {str(e).lower() for e in exts}
    return errors


_INVALID = re.compile(r'[<>:"|?*\x00-\x1f]')


@dataclass
class Move:
    src: Path
    dst_folder: str          # root 기준 상대 폴더 (예: "02_강의자료/통계학특론")
    reason: str
    source: str              # existing | keyword | ext | ai | fallback
    skip: bool = False


def sanitize_folder(name: str) -> str:
    """AI/사용자 입력 폴더 경로를 안전하게 정리 (최대 2단계, 상위 경로 이동 금지)."""
    parts = [p.strip().strip(".") for p in re.split(r"[\\/]+", name or "")]
    parts = [_INVALID.sub("_", p)[:60] for p in parts if p and p not in (".", "..")]
    return "/".join(parts[:2]) or CATEGORIES["misc"]


def list_existing_folders(root: Path) -> list[str]:
    if not root.is_dir():
        return []
    return sorted(p.name for p in root.iterdir()
                  if p.is_dir() and not p.name.startswith((".", "$")))


def _tokens(folder: str) -> list[str]:
    stripped = re.sub(r"^\d+[_\-\s]*", "", folder)
    return [t for t in re.split(r"[_\-\s]+", stripped) if len(t) >= 2]


def classify(path: Path, existing: Iterable[str] = ()) -> tuple[Optional[str], str, str]:
    """규칙 기반 분류. (폴더, 이유, source) 반환. 확신이 없으면 폴더가 None."""
    name = path.stem.lower()
    ext = path.suffix.lower()

    # 1) 이미 있는 폴더 이름이 파일명에 들어있으면 그 폴더 사용
    for folder in existing:
        if any(t.lower() in name for t in _tokens(folder)) and not folder.startswith(tuple("0123456789")):
            return folder, f"기존 폴더 '{folder}' 이름과 일치", "existing"

    # 2) 파일명 키워드
    for key, pattern in KEYWORD_RULES:
        if re.search(pattern, name, re.IGNORECASE):
            return CATEGORIES[key], f"파일명 키워드({key})", "keyword"

    # 3) 확장자
    for key, exts in EXT_RULES.items():
        if ext in exts:
            return CATEGORIES[key], f"확장자 {ext}", "ext"

    return None, "문서 종류 불명확", "fallback"


def scan(sources: Iterable[Path], dest_root: Path, recursive: bool = False) -> list[Path]:
    """정리 대상 파일 수집. 시스템/프로그램/프로젝트 폴더와 대상 루트는 건너뜀."""
    dest_root = dest_root.resolve()
    files: list[Path] = []

    def walk(d: Path, depth: int):
        try:
            entries = list(d.iterdir())
        except (PermissionError, OSError):
            return
        names = {e.name for e in entries}
        if depth > 0 and names & PROJECT_MARKERS:
            return  # 프로젝트 폴더는 통째로 건드리지 않음
        for e in entries:
            try:
                if e.name.startswith(("~$", ".")):
                    continue
                if e.is_dir():
                    if (recursive and e.name.lower() not in SKIP_DIRS
                            and e.resolve() != dest_root and not e.name.startswith("$")):
                        walk(e, depth + 1)
                elif e.is_file() and e.suffix.lower() not in SKIP_EXT:
                    files.append(e)
            except OSError:
                continue

    for s in sources:
        s = Path(s)
        if s.is_file():
            if s.suffix.lower() not in SKIP_EXT:
                files.append(s)
        elif s.is_dir():
            walk(s, 0)
    # 대상 루트 안에 이미 있는 파일은 제외
    out = []
    for f in files:
        try:
            f.resolve().relative_to(dest_root)
        except ValueError:
            out.append(f)
    return out


def build_plan(files: list[Path], dest_root: Path, ai=None,
               progress: Optional[Callable[[int, int], None]] = None) -> list[Move]:
    """분류 계획 생성. ai는 classify_batch(items, existing)->dict 를 가진 객체(선택)."""
    existing = list_existing_folders(dest_root)
    plan: list[Move] = []
    unsure: list[Move] = []
    for i, f in enumerate(files):
        folder, reason, source = classify(f, existing)
        if folder is None:
            m = Move(f, CATEGORIES["misc"], reason, "fallback")
            unsure.append(m)
        else:
            m = Move(f, folder, reason, source)
        plan.append(m)
        if progress:
            progress(i + 1, len(files))

    if ai is not None and unsure:
        known = sorted(set(existing) | set(CATEGORIES.values()))
        try:
            answers = ai.classify_batch([m.src for m in unsure], known)
        except Exception as e:  # 네트워크/키 오류 시 규칙 결과로 계속 진행
            for m in unsure:
                m.reason = f"AI 실패({type(e).__name__}) - 미분류"
            return plan
        for m in unsure:
            folder = answers.get(str(m.src))
            if folder:
                m.dst_folder = sanitize_folder(folder)
                m.source = "ai"
                m.reason = "AI 분류" + (" (새 폴더)" if m.dst_folder.split("/")[0] not in known else "")
    return plan


def _free_name(path: Path) -> Path:
    if not path.exists():
        return path
    n = 1
    while True:
        cand = path.with_name(f"{path.stem} ({n}){path.suffix}")
        if not cand.exists():
            return cand
        n += 1


def apply_plan(plan: list[Move], dest_root: Path, source: str = "manual") -> Path:
    """계획 실행. 기록(journal) 파일 경로 반환. 덮어쓰기는 하지 않음.
    source: 'manual'(사용자가 실행) | 'auto'(자동 감시)"""
    dest_root = Path(dest_root)
    items = []
    for m in plan:
        if m.skip or not m.src.exists():
            continue
        target_dir = dest_root / sanitize_folder(m.dst_folder)
        target_dir.mkdir(parents=True, exist_ok=True)
        target = _free_name(target_dir / m.src.name)
        shutil.move(str(m.src), str(target))
        items.append({"src": str(m.src), "dst": str(target), "folder": m.dst_folder,
                      "reason": m.reason, "undone": False})
    jdir = dest_root / JOURNAL_DIR
    jdir.mkdir(parents=True, exist_ok=True)
    stamp = time.strftime("%Y%m%d_%H%M%S")
    journal, n = jdir / f"{stamp}.json", 1
    while journal.exists():
        journal, n = jdir / f"{stamp}_{n}.json", n + 1
    _write_journal(journal, {"version": 2, "time": time.strftime("%Y-%m-%d %H:%M:%S"),
                             "source": source, "items": items})
    return journal


def _write_journal(path: Path, data: dict) -> None:
    Path(path).write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")


def read_journal(path: Path) -> dict:
    """기록 파일 읽기. 예전 형식(목록)도 같은 구조로 변환."""
    path = Path(path)
    data = json.loads(path.read_text(encoding="utf-8"))
    if isinstance(data, list):
        data = {"version": 1, "source": "manual", "items": data,
                "time": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(path.stat().st_mtime))}
    for it in data["items"]:
        it.setdefault("undone", False)
        it.setdefault("folder", Path(it["dst"]).parent.name)
        it.setdefault("reason", "")
    return data


def list_history(dest_root: Path) -> list[dict]:
    """이동 기록 목록 (최신순). 각 항목: path, time, source, items."""
    jdir = Path(dest_root) / JOURNAL_DIR
    out = []
    for f in sorted(jdir.glob("*.json"), reverse=True) if jdir.is_dir() else []:
        try:
            d = read_journal(f)
        except (ValueError, OSError, KeyError):
            continue
        d["path"] = f
        out.append(d)
    return out


def undo(journal: Path, indices: Optional[Iterable[int]] = None) -> tuple[int, int]:
    """기록의 파일을 원위치로 되돌림. indices가 없으면 전체. (복구 수, 건너뜀 수) 반환."""
    data = read_journal(journal)
    items = data["items"]
    todo = set(range(len(items))) if indices is None else set(indices)
    ok = skipped = 0
    for i in sorted(todo, reverse=True):
        e = items[i]
        if e["undone"]:
            continue
        src, dst = Path(e["src"]), Path(e["dst"])
        if not dst.exists():
            skipped += 1
            continue
        src.parent.mkdir(parents=True, exist_ok=True)
        shutil.move(str(dst), str(_free_name(src)))
        e["undone"] = True
        ok += 1
        try:  # 비게 된 폴더 정리
            dst.parent.rmdir()
        except OSError:
            pass
    _write_journal(Path(journal), data)
    return ok, skipped


def latest_journal(dest_root: Path) -> Optional[Path]:
    """아직 되돌리지 않은 파일이 남은 가장 최근 기록."""
    for h in list_history(dest_root):
        if any(not it["undone"] for it in h["items"]):
            return h["path"]
    return None


def stable_files(files: Iterable[Path], min_age: float = 5.0) -> list[Path]:
    """다운로드/복사 중인 파일을 피하기 위해 마지막 수정 후 min_age초 지난 파일만."""
    now, out = time.time(), []
    for f in files:
        try:
            if now - f.stat().st_mtime >= min_age:
                out.append(f)
        except OSError:
            continue
    return out


# ---- 앱 상태 저장 (정리 대상 폴더 등) ----
def state_path() -> Path:
    return config_path().with_name("state.json")


def load_state() -> dict:
    default_src = Path.home() / "Downloads"
    st = {"sources": [str(default_src)] if default_src.is_dir() else [],
          "dest": str(Path.home() / "대학원_정리"), "recursive": False,
          "auto_watch": False, "use_ai": False}
    try:
        st.update(json.loads(state_path().read_text(encoding="utf-8")))
    except (ValueError, OSError):
        pass
    return st


def save_state(st: dict) -> None:
    p = state_path()
    try:
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(json.dumps(st, ensure_ascii=False, indent=2), encoding="utf-8")
    except OSError:
        pass
