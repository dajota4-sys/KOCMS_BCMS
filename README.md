# AI 폴더 정리기 (대학원생 버전)

파일을 창에 끌어놓으면 논문/강의자료/과제/연구데이터 등으로 자동 분류해 폴더에 넣어줍니다.
분류가 애매하면 (AI 사용 시) 새 폴더를 만들어 넣습니다. **실행 전 미리보기, 실행 후 되돌리기 지원.**

## 간편 설치 (Windows)
1. 저장소를 ZIP으로 받아 압축 해제 (또는 `git clone`)
2. `install.bat` 더블클릭 → 바탕화면에 "AI 폴더 정리기" 바로가기 생성 (Python 3.10+ 필요)

**Setup.exe 설치파일**: GitHub → Actions → `build-windows-installer` → Run workflow → Artifacts에서 `AIFolderOrganizer-Setup.exe` 다운로드. (`v0.1.0` 같은 태그를 푸시하면 Releases에도 올라갑니다. 로컬 빌드는 `build_windows.bat`)

## 수동 설치 (Windows, Python 3.10+)
```
pip install -r requirements.txt
```
AI 분류(선택): 환경변수 `ANTHROPIC_API_KEY` 설정. 파일명(옵션: 텍스트 앞 400자)만 API로 전송됩니다.

## 사용
- GUI: `python -m organizer gui` → 파일/폴더 드래그 → 목록에서 폴더 더블클릭으로 수정 → **정리 실행**
- D 드라이브 정리(미리보기): `python -m organizer scan D:\ --dest D:\대학원정리`
- 실제 이동: 위 명령 끝에 `--apply` / 하위폴더까지: `--recursive` / AI: `--ai`
- 되돌리기: `python -m organizer undo --dest D:\대학원정리`

## 내 PC에서 규칙 직접 수정 (GitHub 불필요)
- 창의 **규칙 편집** 버튼 → 메모장으로 `%APPDATA%\AIFolderOrganizer\config.json` 열림 (명령줄: `python -m organizer config`)
- `categories`: 폴더 이름 변경/새 폴더 추가 (예: `"mycls": "12_베이지안통계"`)
- `keywords`: 파일명에 이 단어(정규식, `|`로 구분)가 있으면 해당 폴더로 (예: `"mycls": "bayes|베이지안"`)
- `extensions`: 확장자별 폴더
- 저장 후 **규칙 새로고침**. 오류가 있으면 해당 항목만 무시하고 알려줍니다. 망가졌으면 파일을 지우면 기본값으로 복구됩니다.
- 코드 자체도 일반 Python 파일(`organizer/*.py`)이라 메모장/VS Code로 바로 고칠 수 있습니다.

## 안전장치
- 기본은 미리보기. 덮어쓰기 없음(중복 이름은 `이름 (1)`).
- 시스템/프로그램/Git·프로젝트 폴더, `.exe .dll .lnk` 등은 건드리지 않음.
- 모든 이동은 `<정리폴더>/.organizer_journal/`에 기록되어 되돌릴 수 있음.
- 처음엔 `--recursive` 없이 D:\ 최상위만 정리해 보길 권장.

## 분류 우선순위
기존 폴더 이름 일치 → 파일명 키워드(과제/강의/논문/학위논문…) → 확장자 → AI → `99_미분류`

테스트: `python -m unittest discover -s tests`
