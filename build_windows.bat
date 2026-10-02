@echo off
rem Setup.exe 직접 빌드 (Windows + Python + Inno Setup 6 필요)
cd /d "%~dp0"
python -m pip install pyinstaller tkinterdnd2 anthropic || exit /b 1
python -m PyInstaller --noconfirm --windowed --name AIFolderOrganizer --collect-all tkinterdnd2 app_main.py || exit /b 1
iscc installer\setup.iss || exit /b 1
echo 완료: installer\Output\AIFolderOrganizer-Setup.exe
