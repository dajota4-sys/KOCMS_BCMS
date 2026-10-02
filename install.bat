@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
echo === AI 폴더 정리기 설치 ===
where python >nul 2>nul
if errorlevel 1 (
  echo Python 3.10 이상이 필요합니다. 설치 페이지를 엽니다. 설치 시 "Add python.exe to PATH"를 체크하세요.
  start https://www.python.org/downloads/windows/
  pause & exit /b 1
)
if not exist .venv python -m venv .venv || goto :fail
".venv\Scripts\python.exe" -m pip install --upgrade pip tkinterdnd2 anthropic || goto :fail
set "TARGET=%~dp0.venv\Scripts\pythonw.exe"
set "ARGS=-m organizer gui"
powershell -NoProfile -Command "$s=(New-Object -ComObject WScript.Shell).CreateShortcut([Environment]::GetFolderPath('Desktop')+'\AI 폴더 정리기.lnk'); $s.TargetPath='%TARGET%'; $s.Arguments='%ARGS%'; $s.WorkingDirectory='%~dp0'; $s.Save()"
echo.
echo 설치 완료! 바탕화면의 "AI 폴더 정리기" 아이콘으로 실행하세요.
echo (AI 분류를 쓰려면 setx ANTHROPIC_API_KEY 키값  을 한 번 실행 후 새로 시작)
pause & exit /b 0
:fail
echo 설치 중 오류가 발생했습니다.
pause & exit /b 1
