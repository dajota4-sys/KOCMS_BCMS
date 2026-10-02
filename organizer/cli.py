"""명령줄 사용: python -m organizer scan D:\\ --dest D:\\대학원 [--recursive] [--ai] [--apply]"""
from __future__ import annotations

import argparse
import collections
import sys
from pathlib import Path

from . import ai as ai_mod
from .core import apply_plan, build_plan, ensure_config, latest_journal, load_config, scan, undo


def main(argv=None) -> int:
    p = argparse.ArgumentParser(prog="organizer", description="AI 폴더 정리기 (대학원생 버전)")
    sub = p.add_subparsers(dest="cmd")
    s = sub.add_parser("scan", help="폴더 정리 (기본은 미리보기만)")
    s.add_argument("sources", nargs="+", type=Path, help="정리할 폴더/파일 (예: D:\\)")
    s.add_argument("--dest", type=Path, required=True, help="정리된 파일이 모일 폴더")
    s.add_argument("--recursive", action="store_true", help="하위 폴더 안의 파일도 포함")
    s.add_argument("--ai", action="store_true", help="애매한 파일은 Claude로 분류")
    s.add_argument("--ai-text", action="store_true", help="AI에 텍스트 파일 앞부분도 전송")
    s.add_argument("--apply", action="store_true", help="실제로 이동 (없으면 미리보기)")
    u = sub.add_parser("undo", help="마지막 정리 되돌리기")
    u.add_argument("--dest", type=Path, required=True)
    sub.add_parser("config", help="분류 규칙 설정 파일 위치 출력/생성")
    sub.add_parser("gui", help="드래그&드롭 창 열기")
    a = p.parse_args(argv)

    if a.cmd in (None, "gui"):
        from .gui import run
        run()
        return 0
    if a.cmd == "config":
        print(ensure_config())
        return 0
    for err in load_config():
        print("!", err, file=sys.stderr)
    if a.cmd == "undo":
        j = latest_journal(a.dest)
        if not j:
            print("되돌릴 기록이 없습니다.")
            return 1
        ok, sk = undo(j)
        print(f"복구 {ok}개, 건너뜀 {sk}개 ({j.name})")
        return 0

    classifier = None
    if a.ai:
        if ai_mod.available():
            classifier = ai_mod.ClaudeClassifier(use_text=a.ai_text)
        else:
            print("! ANTHROPIC_API_KEY 또는 anthropic 패키지가 없어 규칙 분류만 사용합니다.", file=sys.stderr)
    files = scan(a.sources, a.dest, a.recursive)
    plan = build_plan(files, a.dest, classifier)
    counts = collections.Counter(m.dst_folder for m in plan)
    for m in plan:
        print(f"{m.src}  ->  {m.dst_folder}   [{m.reason}]")
    print(f"\n총 {len(plan)}개 파일")
    for folder, n in counts.most_common():
        print(f"  {folder}: {n}")
    if not a.apply:
        print("\n미리보기입니다. 실제로 옮기려면 --apply 를 추가하세요.")
        return 0
    j = apply_plan(plan, a.dest)
    print(f"완료. 되돌리기: python -m organizer undo --dest {a.dest}  (기록: {j})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
