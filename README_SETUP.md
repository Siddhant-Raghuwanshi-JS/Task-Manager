# Task Manager - Full Stack Application

A complete task management application with React frontend and Express.js backend API.

## 🎯 Features

- ✅ Create, Read, Update, Delete (CRUD) tasks
- 📁 Category filtering
- ⚡ Priority level management
- ✔️ Mark tasks as complete/incomplete
- 📅 Due date support
- 🔄 Real-time synchronization between frontend and backend
- 📊 Task statistics (total, completed, pending)
- 🛡️ CORS enabled for secure cross-origin requests

## 📁 Project Structure

```
task-manager/
├── backend/                 # Express.js API Server
│   ├── server.js           # Main server file with all API endpoints
│   ├── package.json        # Backend dependencies
│   ├── .env                # Environment variables
│   └── node_modules/
│
└── task-manager/           # React Frontend (Vite)
    ├── src/
    │   ├── context/
    │   │   └── TaskContext.jsx    # Context with API integration
    │   ├── components/            # React components
    │   ├── utils/
    │   │   └── api.js            # API client utilities
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.local          # Frontend environment variables
    ├── package.json        # Frontend dependencies
    └── public/
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

#### 1. Backend Setup
```bash
cd backend
npm install
```

#### 2. Frontend Setup
```bash
cd ../task-manager
npm install
```

## 📌 Running the Application

### Start Backend Server
```bash
cd backend
npm start              # Production mode
# OR
npm run dev           # Development mode with auto-reload (--watch)
```

The backend will run on `http://localhost:5000`

### Start Frontend Development Server (in another terminal)
```bash
cd task-manager
npm run dev
```

The frontend will typically run on `http://localhost:5173`

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get a specific task |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |
| PATCH | `/tasks/:id/toggle` | Toggle task completion status |
| GET | `/statistics` | Get task statistics |
| GET | `/health` | Health check |

### Task Object Structure
```json
{
  "id": 1,
  "task": "Buy groceries",
  "complete": false,
  "category": "Shopping",
  "priority": "High",
  "dueDate": "2024-12-31",
  "createdAt": "2024-12-20T10:30:00Z",
  "updatedAt": "2024-12-20T10:30:00Z"
}
```

## 📝 Creating a Task (Example)

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "task": "Complete project",
    "category": "Work",
    "priority": "High",
    "dueDate": "2024-12-31"
  }'
```

## 🛠️ Configuration

### Backend (.env)
```
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

## 📊 How It Works

1. **Frontend** - React app with Vite
   - Uses React Context (TaskContext) to manage global state
   - Makes API calls via `axios` using the `api.js` utility
   - Falls back to localStorage if API is unavailable
   - Auto-saves to localStorage as backup

2. **Backend** - Express.js API
   - Provides RESTful endpoints for task management
   - Uses in-memory storage (can be replaced with MongoDB)
   - Includes error handling & validation
   - CORS enabled for frontend communication

3. **Data Flow**
   - Frontend loads tasks from API on mount
   - All changes (add/delete/update) are sent to the API
   - API processes and returns updated data
   - Frontend state is synced with the response
   - Data is also saved to localStorage as fallback

## 🔄 Available Context Methods

```javascript
import { TaskContext } from "./context/TaskContext";

const {
  task,              // All tasks array
  filteredTask,      // Filtered tasks based on filters
  filter,            // Current status filter
  setFilter,         // Set status filter (all/complete/pending)
  addTask,           // Add new task (async)
  deleteTask,        // Delete task (async)
  toggleTask,        // Toggle completion status (async)
  updateTask,        // Update task text (async)
  totalTask,         // Total task count
  completedTask,     // Completed task count
  pendingTask,       // Pending task count
  categoryFilter,    // Current category filter
  setCategoryFilter, // Set category filter
  priorityFilter,    // Current priority filter
  setPriorityFilter, // Set priority filter
  loading,           // Loading state
  error,             // Error message
  fetchTasks         // Manual fetch tasks function
} = useContext(TaskContext);
```

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Ensure backend is running on `http://localhost:5000`
- Check `.env.local` has correct `VITE_API_URL`
- Check browser console for CORS errors
- Verify FRONTEND_URL in backend `.env`

### Tasks not persisting
- Check Network tab in browser DevTools for failed API requests
- Ensure backend is running and healthy: `http://localhost:5000/api/health`
- Check backend console for errors

### Port already in use
- Backend: Change PORT in `.env` (e.g., `PORT=5001`)
- Frontend: Vite will prompt to use another port automatically

## 📦 Deployment Notes

### For Production:
1. Build frontend: `npm run build` in `task-manager/`
2. Connect to a real database (MongoDB, PostgreSQL, etc.) instead of in-memory
3. Set proper environment variables
4. Use environment-specific configurations
5. Add authentication/authorization
6. Use a process manager like PM2 for backend

## 🤝 Frontend Component Integration

The TaskContext is already integrated with your components. Components can use it like:

```javascript
import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export function TaskForm() {
  const { addTask, loading, error } = useContext(TaskContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask(taskText, category, priority, dueDate);
  };

  return (
    // Your JSX here
  );
}
```

## 📞 Support

For issues or questions, check:
- Backend logs in terminal
- Frontend console (Browser DevTools)
- Network requests in DevTools Network tab

---

**Created**: December 2024
**Last Updated**: December 2024
