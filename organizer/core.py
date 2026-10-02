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


def apply_plan(plan: list[Move], dest_root: Path) -> Path:
    """계획 실행. 되돌리기용 journal 파일 경로 반환. 덮어쓰기는 하지 않음."""
    dest_root = Path(dest_root)
    done = []
    for m in plan:
        if m.skip or not m.src.exists():
            continue
        target_dir = dest_root / sanitize_folder(m.dst_folder)
        target_dir.mkdir(parents=True, exist_ok=True)
        target = _free_name(target_dir / m.src.name)
        shutil.move(str(m.src), str(target))
        done.append({"src": str(m.src), "dst": str(target)})
    jdir = dest_root / JOURNAL_DIR
    jdir.mkdir(parents=True, exist_ok=True)
    journal = jdir / f"{time.strftime('%Y%m%d_%H%M%S')}.json"
    journal.write_text(json.dumps(done, ensure_ascii=False, indent=1), encoding="utf-8")
    return journal


def undo(journal: Path) -> tuple[int, int]:
    """journal 기록을 역순으로 원위치. (복구 수, 건너뜀 수) 반환."""
    entries = json.loads(Path(journal).read_text(encoding="utf-8"))
    ok = skipped = 0
    for e in reversed(entries):
        src, dst = Path(e["src"]), Path(e["dst"])
        if not dst.exists():
            skipped += 1
            continue
        src.parent.mkdir(parents=True, exist_ok=True)
        shutil.move(str(dst), str(_free_name(src)))
        ok += 1
        try:  # 비게 된 폴더 정리
            dst.parent.rmdir()
        except OSError:
            pass
    return ok, skipped


def latest_journal(dest_root: Path) -> Optional[Path]:
    jdir = Path(dest_root) / JOURNAL_DIR
    files = sorted(jdir.glob("*.json")) if jdir.is_dir() else []
    return files[-1] if files else None
