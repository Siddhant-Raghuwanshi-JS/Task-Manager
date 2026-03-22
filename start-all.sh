#!/bin/bash
# Task Manager - Complete Startup Script
# This script starts both backend and frontend servers

echo "===================================="
echo "  Task Manager - Full Stack"
echo "===================================="
echo ""

# Start backend in background
echo "Starting backend server on port 5000..."
cd backend
npm start &
BACKEND_PID=$!

sleep 2

# Start frontend
echo ""
echo "Starting frontend server..."
cd ../task-manager
npm run dev &
FRONTEND_PID=$!

echo ""
echo "===================================="
echo "✅ Both servers are running!"
echo "===================================="
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop servers"
echo ""

wait
