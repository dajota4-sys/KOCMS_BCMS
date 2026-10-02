@echo off
setlocal
cd /d "%~dp0"
set PYTHONUTF8=1
set PYTHONIOENCODING=utf-8
echo ===== AI 폴더 정리기 설치 =====
echo.

set "PY="
python --version >nul 2>nul && set "PY=python"
if not defined PY (
  py -3 --version >nul 2>nul && set "PY=py -3"
)
if not defined PY (
  echo [오류] Python 3.10 이상이 필요합니다.
  echo 설치 페이지를 엽니다. 설치할 때 "Add python.exe to PATH"를 꼭 체크하세요.
  start https://www.python.org/downloads/windows/
  pause
  exit /b 1
)

echo [1/3] 가상환경 만드는 중...
if not exist ".venv\Scripts\python.exe" %PY% -m venv .venv
if errorlevel 1 goto fail

echo [2/3] 필요한 패키지 설치 중... (1~2분 걸릴 수 있습니다)
".venv\Scripts\python.exe" -m pip install --upgrade pip tkinterdnd2 anthropic
if errorlevel 1 goto fail

echo [3/3] 바탕화면 바로가기 만드는 중...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0make_shortcut.ps1" -AppDir "%~dp0."
if errorlevel 1 goto fail

echo.
echo 설치가 끝났습니다. 바탕화면의 "AI 폴더 정리기" 아이콘으로 실행하세요.
echo AI 분류를 쓰려면 한 번만 실행: setx ANTHROPIC_API_KEY 발급받은키
pause
exit /b 0

:fail
echo.
echo [오류] 설치 중 문제가 발생했습니다. 위의 메시지를 확인해 주세요.
pause
exit /b 1
