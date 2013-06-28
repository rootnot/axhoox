@echo off

goto :START

:_cp
echo copying:
echo %~dpf1 
echo to 
echo %~dpf2
copy "%~dpf1" "%~dpf2"
goto :END

:_ln
SETLOCAL
echo hardlinking
echo %~dpf2 
echo to 
echo %~dpf1
mklink /H "%~dpf2" "%~dpf1"
ENDLOCAL
goto :END

:START

IF [%1]==[] (
	echo USAGE: protoinstall.bat targetdir
	goto :END
)

IF NOT EXIST %1 (
	echo %1 does not exist
	goto :END
)

set attr=%~a1

IF /I NOT [%attr:~0,1%] == [d] (
	echo %1 is not a directory
	goto :END
)

set targetpath=%~f1

IF NOT EXIST "%targetpath%\__axhoox" (
  mkdir  "%targetpath%\__axhoox";
)

IF /I NOT [%~d1] == [%~d0] (
	echo Target drive different than source. Files will be copied.
	set fn=:_cp
) ELSE (
	echo Target drive same as source. Files will be hardlinked.
	set fn=:_ln
)

IF EXIST "%targetpath%\__axhoox\axhoox.js" del "%targetpath%\__axhoox\axhoox.js"

call %fn% source\axhoox.js "%targetpath%\__axhoox\axhoox.js"

IF EXIST "%targetpath%\__axhoox\axhooxload.html" del "%targetpath%\__axhoox\axhooxload.html"

call %fn% source\axhooxload.html "%targetpath%\__axhoox\axhooxload.html"

IF errorlevel 1 (
	echo Some tasks went wrong. Runtime errors occured.
) ELSE (
	echo "AXHOOX succesfuly instaled in %targetpath%"
)

:END
