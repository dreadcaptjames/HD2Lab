@echo off
if "%~1"=="" (
  echo Drag the previous HD2Lab ZIP or standalone HTML file onto this batch file.
  pause
  exit /b 1
)
py -3 "%~dp0apply_warbond_update.py" "%~1"
if errorlevel 1 (
  echo The update did not complete. Ensure Python 3 is installed and use your v6.0 site ZIP.
)
pause
