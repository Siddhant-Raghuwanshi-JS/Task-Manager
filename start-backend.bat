@echo off
REM Task Manager - Backend Server Startup Script
REM This script starts the Express.js backend server

echo.
echo ====================================
echo  Task Manager - Backend Server
echo ====================================
echo.

cd backend
echo Starting backend server on port 5000...
echo.

npm start

pause
