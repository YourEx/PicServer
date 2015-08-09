@echo off
   
if "%1"=="debug" start node.exe --debug-brk %2
if "%1"=="debug-console" start node.exe debug %2
if "%1"=="debug-tests" start mocha --debug-brk %2
if "%1"=="kill" taskkill /F /IM node.exe & %2
if "%1"=="run" node.exe %2
if "%1"=="test" mocha %2
