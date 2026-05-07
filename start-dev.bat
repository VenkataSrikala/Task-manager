@echo off
echo ========================================
echo Team Task Manager - Development Setup
echo ========================================
echo.

echo Checking if MySQL is required...
echo Please ensure MySQL is running before continuing!
echo.
pause

echo.
echo Starting Backend Server...
start cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend Server...
start cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo ========================================
echo.
echo Press any key to exit this window...
pause > nul
