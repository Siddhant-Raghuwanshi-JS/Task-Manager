# 🗄️ MongoDB + Mongoose Integration - Complete Setup

## What Changed

Your Task Manager now uses **MongoDB** with **Mongoose** for persistent data storage instead of in-memory storage. This means:

✅ Data persists across server restarts  
✅ Scalable database solution  
✅ Built-in validation and schema enforcement  
✅ Easy to add features like user authentication  
✅ Production-ready architecture  

---

## New Files Created

### Backend Structure:
```
backend/
├── server.js               (Updated - now uses MongoDB)
├── config/
│   └── database.js         (NEW - MongoDB connection)
├── models/
│   └── Task.js             (NEW - Mongoose schema)
├── .env                    (Updated - added MONGODB_URI)
├── .env.example            (NEW - template)
└── package.json            (Updated - added mongoose)
```

### Files Created:
1. **backend/config/database.js** - Database connection handler
2. **backend/models/Task.js** - Mongoose Task schema with validation
3. **backend/.env.example** - Environment template
4. **MONGODB_SETUP.md** - Complete MongoDB setup guide

### Files Updated:
1. **backend/server.js** - Replaced in-memory with MongoDB queries
2. **backend/.env** - Added MONGODB_URI
3. **backend/package.json** - Added mongoose dependency
4. **task-manager/src/utils/api.js** - Improved error handling
5. **task-manager/src/context/TaskContext.jsx** - Handle MongoDB ObjectIds

---

## Database Schema

### Task Model (MongoDB Collection: tasks)

```javascript
{
  _id: ObjectId,                    // MongoDB auto-generated ID
  task: String (required),          // Task description
  complete: Boolean,                // Completion status
  category: String,                 // Task category
  priority: {                       // Priority level
    Type: String,
    enum: ['Low', 'Medium', 'High']
  },
  dueDate: Date,                    // Task due date
  description: String,              // Additional details
  createdAt: Date,                  // Auto-generated
  updatedAt: Date                   // Auto-updated
}
```

---

## Environment Configuration

### .env File
```env
# Server
PORT=5000
FRONTEND_URL=http://localhost:5173

# MongoDB Local
MONGODB_URI=mongodb://localhost:27017/task-manager

# OR MongoDB Atlas (Cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager
```

---

## Setup Instructions

### Step 1: Install MongoDB

**Windows:**
- Download: https://www.mongodb.com/try/download/community
- Run installer, check "Install as Service"
- Verify: `mongosh --version`

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### Step 2: Verify MongoDB Connection

```bash
# Open MongoDB shell
mongosh

# Show databases
show databases

# Exit
exit
```

### Step 3: Start Backend

```bash
cd backend
npm start

# Expected Output:
# ✅ MongoDB Connected: localhost
# ✅ Server running at http://localhost:5000
# 🗄️  Database: MongoDB
```

### Step 4: Start Frontend

```bash
cd task-manager
npm run dev

# Go to: http://localhost:5173
```

---

## API Endpoints (MongoDB)

All endpoints now use MongoDB ObjectIds for task IDs:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks with filtering |
| GET | `/api/tasks/:id` | Get specific task by MongoDB ObjectId |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| PATCH | `/api/tasks/:id/toggle` | Toggle completion |
| DELETE | `/api/tasks/delete/completed` | Delete all completed tasks |
| GET | `/api/statistics` | Get task statistics |
| GET | `/api/health` | Health check |

### Example: Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "task": "Learn MongoDB",
    "category": "Education",
    "priority": "High",
    "dueDate": "2024-12-31",
    "description": "Complete MongoDB course"
  }'
```

**MongoDB Response (with ObjectId):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",  // MongoDB ObjectId
    "task": "Learn MongoDB",
    "complete": false,
    "category": "Education",
    "priority": "High",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "description": "Complete MongoDB course",
    "createdAt": "2024-12-20T10:30:00.000Z",
    "updatedAt": "2024-12-20T10:30:00.000Z"
  }
}
```

---

## Database Connection Flow

```
┌─────────────────┐
│   Frontend      │
│   (React/Vite)  │
└────────┬────────┘
         │ HTTP Requests
         ↓
┌─────────────────┐
│   Backend       │
│  (Express.js)   │
└────────┬────────┘
         │ Mongoose Queries
         ↓
┌─────────────────┐
│    MongoDB      │
│   (Database)    │
└─────────────────┘
```

---

## Key Features of This Setup

### 1. **Mongoose Validation**
```javascript
// Automatic validation in Task.js
const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, 'Please provide a task description'],
    trim: true,
    minlength: [1, 'Task cannot be empty']
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  }
  // ... more fields
});
```

### 2. **Automatic Timestamps**
- `createdAt`: Set when task is created
- `updatedAt`: Updated automatically when task changes

### 3. **Connection Management**
```javascript
// Automatic reconnection handling in config/database.js
const connection = await mongoose.connect(mongoURI);
```

### 4. **Error Handling**
- Backend validation errors
- MongoDB connection errors
- Proper HTTP status codes
- Error messages to frontend

### 5. **Scalability**
- Ready for user authentication
- Ready for multi-user support
- Supports indexing for performance
- Can easily add more features

---

## Common Issues & Solutions

### Issue: "connect ECONNREFUSED"
**Solution:** MongoDB not running
```bash
# Windows: Start MongoDB Service
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Issue: "cast to ObjectId failed"
**Cause:** Invalid MongoDB ObjectId format
**Solution:** Ensure you're using valid MongoDB ObjectIds from API responses

### Issue: Data not persisting
**Check:**
1. Is MongoDB running? `mongosh`
2. Check MONGODB_URI in `.env`
3. Check backend console for connection errors
4. Verify documents in MongoDB: `db.tasks.find()`

### Issue: "EADDRINUSE" Port 5000 already in use
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change PORT in .env
```

---

## Database Monitoring

### View Tasks in MongoDB:
```bash
mongosh
use task-manager
db.tasks.find()
```

### MongoDB Shell Commands:
```javascript
// Count total tasks
db.tasks.countDocuments()

// Count completed
db.tasks.countDocuments({ complete: true })

// Find high priority tasks
db.tasks.find({ priority: "High" })

// Delete all tasks
db.tasks.deleteMany({})
```

---

## Switching Between Local & Cloud MongoDB

### Option 1: Local MongoDB
```env
MONGODB_URI=mongodb://localhost:27017/task-manager
```

### Option 2: MongoDB Atlas (Cloud)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager?retryWrites=true&w=majority
```

**To use Atlas:**
1. Sign up: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Set up user credentials
4. Whitelist IP addresses
5. Copy connection string
6. Update `.env`

---

## Testing

### Test Health Check:
```bash
curl http://localhost:5000/api/health
```

### Test Create Task:
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"task":"Test","category":"General","priority":"Medium"}'
```

### Test in Frontend:
1. Open http://localhost:5173
2. Create a task
3. Refresh page
4. Task still exists ✅

---

## Next Steps

1. ✅ Install MongoDB
2. ✅ Start MongoDB service
3. ✅ Run backend: `npm start`
4. ✅ Run frontend: `npm run dev`
5. 🎉 Start using the app with persistent data!

### Optional Enhancements:
- Add user authentication with JWT
- Add MongoDB backup/export
- Add frontend loading states
- Add task sorting/pagination
- Add task categories management

---

## Architecture Benefits

| Aspect | Before (Memory) | After (MongoDB) |
|--------|-----------------|-----------------|
| **Persistence** | ❌ Lost on restart | ✅ Permanent |
| **Scalability** | ❌ Limited | ✅ Unlimited |
| **Multi-user** | ❌ Difficult | ✅ Easy to add |
| **Performance** | ✅ Fast | ✅ Fast with indexes |
| **Backup** | ❌ No backup | ✅ Built-in |
| **Production** | ❌ Not suitable | ✅ Production-ready |

---

## Deployment Considerations

### Local Development:
```bash
npm start  # Uses local MongoDB
```

### Production Deployment:
1. Use MongoDB Atlas (cloud)
2. Set secure credentials
3. Whitelist production IP
4. Update environment variables
5. Use process manager (PM2)
6. Enable database backups

```bash
# Production with PM2
npm install -g pm2
pm2 start server.js --name "task-api"
pm2 save
pm2 startup
```

---

**Setup Complete!** Your Task Manager now has professional-grade MongoDB integration. 🚀

*Last Updated: December 2024*
