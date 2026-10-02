param([string]$AppDir)
$AppDir = (Resolve-Path $AppDir).Path
$desktop = [Environment]::GetFolderPath('Desktop')
$ws = New-Object -ComObject WScript.Shell
$s = $ws.CreateShortcut((Join-Path $desktop 'AI 폴더 정리기.lnk'))
$s.TargetPath = Join-Path $AppDir '.venv\Scripts\pythonw.exe'
$s.Arguments = '-m organizer gui'
$s.WorkingDirectory = $AppDir
$s.Save()
