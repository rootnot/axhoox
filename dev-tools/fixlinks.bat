@echo off

goto START

This is for development and testing.
Symbolic links used in windows systems are not properly recognized by GIT so there is a problem with
linking source files to their locations in a testing prototype.

IMPORTANT!

You should use this command every time GIT updates (changes) source files or call it from a post-checkout hook script.

:START
FOR /F "tokens=*" %%G IN ('dir /S /B %~p0..\source') DO (
	call :LN %%~pnxG %~p0..\generated-prototype\__axhoox\%%~nxG
)
GOTO :EOF

:LN
IF EXIST "%~f2" del "%~f2"
mklink /H "%~pnx2" "%~pnx1"
GOTO :EOF
