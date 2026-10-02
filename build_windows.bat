@echo off
rem Setup.exe 직접 빌드 (Windows + Python + Inno Setup 6 필요)
setlocal
cd /d "%~dp0"
set PYTHONUTF8=1
python -m pip install pyinstaller tkinterdnd2 anthropic
if errorlevel 1 exit /b 1
python -m PyInstaller --noconfirm --windowed --name AIFolderOrganizer --collect-all tkinterdnd2 app_main.py
if errorlevel 1 exit /b 1
iscc installer\setup.iss
if errorlevel 1 exit /b 1
echo 완료: installer\Output\AIFolderOrganizer-Setup.exe
pause
