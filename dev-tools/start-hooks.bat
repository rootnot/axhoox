@echo off

goto :START

This is for development and testing.
This script activates post-checkout hook script.

:INSTALL
rem Linking subroutine

IF EXIST "%~dpf2" del "%~dpf2"

cp "%~dpf1" "%~dpf2" > nul

echo Done, post-checkout hook installed to %~dpf2

goto :EOF


:START
rem Main action

set HOOK_FILE=post-checkout

call :INSTALL %~p0\%HOOK_FILE% %~p0..\.git\hooks\%HOOK_FILE%

IF errorlevel 1 (
	echo Some tasks went wrong. Runtime errors occured.
)
