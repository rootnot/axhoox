@echo off

goto START

This is for development and testing.
Symbolic links used in windows systems are not properly recognized by GIT so there is a problem with
linking source files to their locations in a testing prototype.

IMPORTANT!

You should use this command every time GIT updates (changes) source files.

:START
IF EXIST generated-prototype\__axhoox\axhoox.js del generated-prototype\__axhoox\axhoox.js
mklink /H generated-prototype\__axhoox\axhoox.js source\axhoox.js
IF EXIST generated-prototype\__axhoox\axhooxload.html del generated-prototype\__axhoox\axhooxload.html
mklink /H generated-prototype\__axhoox\axhooxload.html source\axhooxload.html
