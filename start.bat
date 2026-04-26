@echo off
:: Get the current folder path where the shortcut is saved
set PROJECT_DIR=%~dp0

:: Start the Server
echo Starting Server...
start "Backend Server" cmd /c "cd /d "%PROJECT_DIR%server" && npm start"

:: Start the Client
echo Starting Client...
start "Frontend Client" cmd /c "cd /d "%PROJECT_DIR%client" && npm start"

:: Wait for the React dev server to initialize
echo Waiting for site to load...
timeout /t 8

:: Open the browser
start http://localhost:3000
exit
