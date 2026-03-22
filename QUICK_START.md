# 🚀 Quick Start Guide - Task Manager

## One-Time Setup

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../task-manager
npm install
```

## Running the Application

### Option 1: Using Batch Files (Windows) - Recommended
1. Open Command Prompt in the project root directory
2. Run `start-backend.bat` (opens first terminal)
3. Run `start-frontend.bat` in another Command Prompt (opens second terminal)
4. Open browser to `http://localhost:5173`

### Option 2: Manual Command Line

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd task-manager
npm run dev
# Server runs on http://localhost:5173
```

### Option 3: Development Mode with Auto-Reload

**Terminal 1 - Backend (with auto-reload):**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd task-manager
npm run dev
```

## Expected Output

### Backend Terminal
```
✅ Server running at http://localhost:5000
📝 Frontend should connect to: http://localhost:5000/api
```

### Frontend Terminal
```
  VITE v7.3.1  ready in 245 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

## Testing the API

### Method 1: Browser
1. Go to `http://localhost:5173` in your browser
2. Add tasks, delete tasks, mark as complete
3. Refresh page - tasks persist from backend

### Method 2: cURL Commands
```bash
# Get all tasks
curl http://localhost:5000/api/tasks

# Health check
curl http://localhost:5000/api/health

# Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"task":"My Task","category":"Work","priority":"High"}'
```

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Cannot connect to backend" | Ensure backend is running on port 5000 |
| "Port 5000 already in use" | Kill process: `netstat -ano \| findstr :5000` then `taskkill /PID <PID> /F` |
| "CORS error" | Backend's FRONTEND_URL in `.env` might be wrong |
| "Tasks not saving" | Check browser console for API errors |
| "Module not found" | Run `npm install` in both backend and task-manager folders |

## File Structure

```
task-manager/
├── backend/
│   ├── server.js          ← Main API
│   ├── .env               ← Config
│   └── package.json
├── task-manager/
│   ├── src/
│   │   ├── context/
│   │   │   └── TaskContext.jsx    ← API integration
│   │   └── utils/
│   │       └── api.js             ← API client
│   ├── .env.local         ← Frontend config
│   └── package.json
├── start-backend.bat      ← Backend launcher
├── start-frontend.bat     ← Frontend launcher
├── README_SETUP.md        ← Full documentation
└── QUICK_START.md         ← This file
```

## Next Steps

1. ✅ Backend running and serving API
2. ✅ Frontend connected to backend
3. ✅ Tasks persist in backend
4. 🔄 Try adding/deleting/updating tasks
5. 📊 Check task statistics feature
6. 🔧 Customize as needed

## Useful Commands

```bash
# Backend development with auto-reload
npm run dev

# Check if API is healthy
curl http://localhost:5000/api/health

# Frontend production build
npm run build

# Lint frontend code
npm run lint
```

---

**Everything is now configured and ready to use!** 🎉
