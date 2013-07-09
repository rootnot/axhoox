@echo off
IF EXIST generated-prototype\__axhoox\axhoox.js del generated-prototype\__axhoox\axhoox.js
mklink /H generated-prototype\__axhoox\axhoox.js source\axhoox.js
IF EXIST generated-prototype\__axhoox\axhooxload.html del generated-prototype\__axhoox\axhooxload.html
mklink /H generated-prototype\__axhoox\axhooxload.html source\axhooxload.html
