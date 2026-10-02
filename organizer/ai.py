"""Claude API 기반 분류 (선택 기능). 파일명(+선택적으로 텍스트 앞부분)만 전송한다."""
from __future__ import annotations

import json
import os
from pathlib import Path

MODEL = "claude-haiku-4-5-20251001"
BATCH = 40
TEXT_EXT = {".txt", ".md", ".tex", ".csv"}

SYSTEM = (
    "당신은 대학원생의 파일 정리 도우미입니다. 각 파일을 어느 폴더에 넣을지 정합니다.\n"
    "규칙: 1) 기존 폴더 목록에 적합한 곳이 있으면 그 이름을 그대로 사용. "
    "2) 없고 분류가 애매하면 새 폴더를 만들어도 됨 (예: '02_강의자료/통계학특론', '01_논문/딥러닝'). "
    "3) 경로는 최대 2단계, 한국어 또는 영어 짧은 이름. "
    "응답은 JSON 객체 하나만: {\"<id>\": \"<폴더경로>\", ...}"
)


def available() -> bool:
    if not os.environ.get("ANTHROPIC_API_KEY"):
        return False
    try:
        import anthropic  # noqa: F401
    except ImportError:
        return False
    return True


def _snippet(path: Path, limit: int = 400) -> str:
    if path.suffix.lower() not in TEXT_EXT:
        return ""
    try:
        return path.read_text(encoding="utf-8", errors="ignore")[:limit]
    except OSError:
        return ""


class ClaudeClassifier:
    def __init__(self, use_text: bool = False, model: str = MODEL):
        import anthropic
        self.client = anthropic.Anthropic()
        self.use_text = use_text
        self.model = model

    def classify_batch(self, files: list[Path], known_folders: list[str]) -> dict[str, str]:
        result: dict[str, str] = {}
        for i in range(0, len(files), BATCH):
            chunk = files[i:i + BATCH]
            items = [{"id": str(n), "name": f.name,
                      **({"snippet": _snippet(f)} if self.use_text else {})}
                     for n, f in enumerate(chunk)]
            msg = self.client.messages.create(
                model=self.model, max_tokens=2000, system=SYSTEM,
                messages=[{"role": "user", "content":
                           f"기존 폴더: {json.dumps(known_folders, ensure_ascii=False)}\n"
                           f"파일: {json.dumps(items, ensure_ascii=False)}"}],
            )
            text = "".join(b.text for b in msg.content if b.type == "text")
            try:
                data = json.loads(text[text.index("{"):text.rindex("}") + 1])
            except ValueError:
                continue
            for n, f in enumerate(chunk):
                if isinstance(data.get(str(n)), str):
                    result[str(f)] = data[str(n)]
        return result
