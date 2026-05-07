@echo off
cls
echo.
echo ========================================
echo   TEAM TASK MANAGER
echo   Full-Stack Application
echo ========================================
echo.
echo Starting servers...
echo.
echo [1/2] Starting Backend Server (Port 5000)...
start "Backend Server" cmd /k "cd /d %~dp0backend && npm run dev"
timeout /t 3 /nobreak > nul

echo [2/2] Starting Frontend Server (Port 3000)...
start "Frontend Server" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================
echo   SERVERS STARTING...
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Two new windows will open:
echo   1. Backend Server (keep it open)
echo   2. Frontend Server (keep it open)
echo.
echo Wait 10 seconds, then open your browser to:
echo   http://localhost:3000
echo.
echo ========================================
echo.
echo Press any key to open browser automatically...
pause > nul

timeout /t 10 /nobreak > nul
start http://localhost:3000

echo.
echo Browser opened! If not, manually go to:
echo http://localhost:3000
echo.
echo To stop servers: Close the two server windows
echo.
pause
