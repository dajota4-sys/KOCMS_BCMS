[Setup]
AppName=AI 폴더 정리기
AppVersion=0.1.0
DefaultDirName={autopf}\AIFolderOrganizer
DefaultGroupName=AI 폴더 정리기
OutputBaseFilename=AIFolderOrganizer-Setup
OutputDir=Output
Compression=lzma
PrivilegesRequired=lowest
UninstallDisplayIcon={app}\AIFolderOrganizer.exe

[Languages]
Name: "korean"; MessagesFile: "compiler:Languages\Korean.isl"

[Files]
Source: "..\dist\AIFolderOrganizer\*"; DestDir: "{app}"; Flags: recursesubdirs

[Icons]
Name: "{group}\AI 폴더 정리기"; Filename: "{app}\AIFolderOrganizer.exe"
Name: "{autodesktop}\AI 폴더 정리기"; Filename: "{app}\AIFolderOrganizer.exe"

[Run]
Filename: "{app}\AIFolderOrganizer.exe"; Description: "지금 실행"; Flags: postinstall nowait skipifsilent
