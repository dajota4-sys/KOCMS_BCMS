# AI 폴더 정리기 (대학원생 버전)

파일을 창에 끌어놓으면 논문/강의자료/과제/연구데이터 등으로 자동 분류해 폴더에 넣어줍니다.
분류가 애매하면 (AI 사용 시) 새 폴더를 만들어 넣습니다. **실행 전 미리보기, 실행 후 되돌리기 지원.**

## 설치 (Windows, Python 3.10+)
```
pip install -r requirements.txt
```
AI 분류(선택): 환경변수 `ANTHROPIC_API_KEY` 설정. 파일명(옵션: 텍스트 앞 400자)만 API로 전송됩니다.

## 사용
- GUI: `python -m organizer gui` → 파일/폴더 드래그 → 목록에서 폴더 더블클릭으로 수정 → **정리 실행**
- D 드라이브 정리(미리보기): `python -m organizer scan D:\ --dest D:\대학원정리`
- 실제 이동: 위 명령 끝에 `--apply` / 하위폴더까지: `--recursive` / AI: `--ai`
- 되돌리기: `python -m organizer undo --dest D:\대학원정리`

## 안전장치
- 기본은 미리보기. 덮어쓰기 없음(중복 이름은 `이름 (1)`).
- 시스템/프로그램/Git·프로젝트 폴더, `.exe .dll .lnk` 등은 건드리지 않음.
- 모든 이동은 `<정리폴더>/.organizer_journal/`에 기록되어 되돌릴 수 있음.
- 처음엔 `--recursive` 없이 D:\ 최상위만 정리해 보길 권장.

## 분류 우선순위
기존 폴더 이름 일치 → 파일명 키워드(과제/강의/논문/학위논문…) → 확장자 → AI → `99_미분류`

테스트: `python -m unittest discover -s tests`
