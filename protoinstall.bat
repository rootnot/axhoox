@echo off

echo(
echo AXHOOX prototype installation.

IF [%1]==[] (
	echo USAGE: protoinstall.bat targetdir
	goto :EOF
)

IF NOT EXIST %1 (
	echo Target directory
	echo %1 
	echo does not exist.
	goto :EOF
)

set attr=%~a1

IF /I NOT [%attr:~0,1%] == [d] (
	echo %1 
	echo is not a directory.
	goto :EOF
)

set targetpath=%~f1

echo Installing AXHOOX in %targetpath%
echo(

IF NOT EXIST "%targetpath%\__axhoox" (
  mkdir  "%targetpath%\__axhoox";
)

FOR /F "tokens=*" %%G IN ('dir /S /B source') DO (
	call :_cp "%%~pnxG" "%targetpath%\__axhoox\%%~nxG"
)

echo(

IF errorlevel 1 (
	echo Some tasks went wrong. Runtime errors occured.
) ELSE (
	echo AXHOOX succesfuly instaled.
)

echo(

goto :EOF

:_cp
echo %~nx1
IF EXIST "%~dpf2" del "%~dpf2"
copy "%~dpf1" "%~dpf2" > nul
goto :EOF

