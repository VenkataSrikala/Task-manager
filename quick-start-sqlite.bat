@echo off
echo ========================================
echo Team Task Manager - Quick Start (SQLite)
echo ========================================
echo.
echo This will use SQLite instead of MySQL for quick testing.
echo.

echo Step 1: Backing up original schema...
copy backend\prisma\schema.prisma backend\prisma\schema.mysql.backup >nul 2>&1

echo Step 2: Using SQLite schema...
copy backend\prisma\schema.sqlite.prisma backend\prisma\schema.prisma >nul 2>&1

echo Step 3: Updating .env for SQLite...
echo DATABASE_URL="file:./dev.db" > backend\.env.temp
echo JWT_SECRET="your-super-secret-jwt-key-change-this-in-production" >> backend\.env.temp
echo PORT=5000 >> backend\.env.temp
echo NODE_ENV=development >> backend\.env.temp
move /Y backend\.env.temp backend\.env >nul 2>&1

echo Step 4: Generating Prisma Client...
cd backend
call npx prisma generate

echo Step 5: Running migrations...
call npx prisma migrate dev --name init

echo.
echo ========================================
echo Setup Complete! Starting servers...
echo ========================================
echo.

echo Starting Backend Server...
start cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo ========================================
echo.
echo To restore MySQL setup later, run:
echo   copy backend\prisma\schema.mysql.backup backend\prisma\schema.prisma
echo.
echo Press any key to exit this window...
pause > nul
