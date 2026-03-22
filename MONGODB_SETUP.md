# 🗄️ MongoDB Setup Guide for Task Manager

## Local MongoDB Setup

### Option 1: Using MongoDB Community Edition (Recommended for Local Development)

#### Windows:
1. Download from: https://www.mongodb.com/try/download/community
2. Run the installer
3. Check "Install MongoDB as a Service"
4. Complete installation
5. MongoDB will run automatically as a Windows Service

**Verify Installation:**
```bash
mongo --version
# Should show version number
```

#### Mac:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu):
```bash
curl https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list
apt-get update
apt-get install -y mongodb-org
systemctl start mongod
```

---

### Option 2: Using MongoDB Atlas (Cloud Database)

1. **Sign Up:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free account

2. **Create Cluster:**
   - Click "Create a Database"
   - Choose Free Tier
   - Select region (closest to you)
   - Click "Create Cluster"

3. **Setup Security:**
   - Go to "Database Access"
   - Create a new user (username: example, password: your-secure-password)
   - Go to "Network Access"
   - Add your IP address (or 0.0.0.0/0 for development)

4. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Update in `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager?retryWrites=true&w=majority
   ```

---

## Verify MongoDB Connection

### Test Local Connection:
```bash
mongosh
# or older version:
mongo

# You should see MongoDB shell prompt
# Type: exit or Ctrl+C to exit
```

### Test in Backend:
```bash
cd backend
npm start
# Should show: ✅ MongoDB Connected: localhost
```

---

## MongoDB Database Structure

### Collections Created:
- **tasks** - Stores all task documents

### Task Document Example:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "task": "Learn MongoDB",
  "complete": false,
  "category": "Education",
  "priority": "High",
  "dueDate": "2024-12-31",
  "description": "Complete MongoDB tutorial",
  "createdAt": "2024-12-20T10:30:00.000Z",
  "updatedAt": "2024-12-20T10:30:00.000Z"
}
```

---

## Common MongoDB Issues

### Issue: MongoDB not starting
**Solution:**
- Windows: Check Services (services.msc) for MongoDB Service
- Mac: `brew services start mongodb-community`
- Linux: `systemctl start mongod`

### Issue: "connect ECONNREFUSED"
**Solutions:**
1. Ensure MongoDB is running
2. Check if port 27017 is correct in `.env`
3. Verify MongoDB URI format
4. Check firewall settings

### Issue: Authentication Failed
**Solutions:**
1. Verify username/password in MongoDB URI
2. Check database name is correct
3. Ensure IP is whitelisted (Atlas)

### Issue: "Database does not exist"
**Note:** MongoDB creates databases automatically when you first insert data. This is normal.

---

## MongoDB Shell Commands (for debugging)

```bash
# Connect to MongoDB
mongosh

# Show all databases
show databases

# Use specific database
use task-manager

# Show collections in database
show collections

# View all tasks
db.tasks.find()

# View task count
db.tasks.countDocuments()

# Count completed tasks
db.tasks.countDocuments({ complete: true })

# Delete all tasks (be careful!)
db.tasks.deleteMany({})

# Exit
exit
```

---

## Backup & Restore (Optional)

### Backup:
```bash
mongodump --db task-manager --out ./backup
```

### Restore:
```bash
mongorestore --db task-manager ./backup/task-manager
```

---

## Environment Variables

Copy `.env.example` to `.env` and update:

```env
# Local MongoDB
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/task-manager

# Or MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager
```

---

## Running with MongoDB

1. **Start MongoDB:**
   - Windows: Automatic
   - Mac: `brew services start mongodb-community`
   - Linux: `systemctl start mongod`

2. **Start Backend:**
   ```bash
   cd backend
   npm start
   ```

3. **Start Frontend:**
   ```bash
   cd task-manager
   npm run dev
   ```

4. **Open Browser:**
   - http://localhost:5173

---

## Monitoring

### View MongoDB Logs:
- Windows: Event Viewer → Windows Logs → Application
- Mac: `cat /usr/local/var/log/mongodb/mongo.log`
- Linux: `/var/log/mongodb/mongod.log`

### Check MongoDB Status:
```bash
# Windows Service
sc query MongoDB

# Linux
systemctl status mongod

# Mac
brew services list
```

---

## Next Steps

1. ✅ Install MongoDB locally or use Atlas
2. ✅ Update `.env` with correct MONGODB_URI
3. ✅ Start MongoDB service
4. ✅ Run backend: `npm start`
5. ✅ Run frontend: `npm run dev`
6. ✅ Start using the app!

All tasks will now be saved to MongoDB instead of memory! 🎉

---

**Created:** December 2024
