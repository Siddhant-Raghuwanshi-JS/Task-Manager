import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import Task from './models/Task.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes

// GET all tasks with filtering
app.get('/api/tasks', async (req, res) => {
  try {
    const { status, category, priority } = req.query;
    
    let filter = {};
    
    if (status === 'complete') filter.complete = true;
    if (status === 'pending') filter.complete = false;
    if (category && category !== 'All') filter.category = category;
    if (priority && priority !== 'All') filter.priority = priority;
    
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single task
app.get('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    
    res.json({ success: true, data: task });
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// CREATE new task
app.post('/api/tasks', async (req, res) => {
  try {
    const { task, category, priority, dueDate, description } = req.body;

    if (!task || task.trim() === '') {
      return res.status(400).json({ success: false, message: 'Task text is required' });
    }

    const newTask = new Task({
      task: task.trim(),
      category: category || 'General',
      priority: priority || 'Medium',
      dueDate: dueDate || null,
      description: description || ''
    });

    const savedTask = await newTask.save();
    
    res.status(201).json({ success: true, data: savedTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// UPDATE task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { task, complete, category, priority, dueDate, description } = req.body;
    
    if (task && task.trim() === '') {
      return res.status(400).json({ success: false, message: 'Task text cannot be empty' });
    }

    const updateData = {};
    if (task !== undefined) updateData.task = task.trim();
    if (complete !== undefined) updateData.complete = complete;
    if (category !== undefined) updateData.category = category;
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = dueDate;
    if (description !== undefined) updateData.description = description;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.json({ success: true, data: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    
    if (!deletedTask) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.json({ success: true, data: deletedTask });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// TOGGLE task completion
app.patch('/api/tasks/:id/toggle', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    task.complete = !task.complete;
    const updatedTask = await task.save();
    
    res.json({ success: true, data: updatedTask });
  } catch (error) {
    console.error('Error toggling task:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET statistics
app.get('/api/statistics', async (req, res) => {
  try {
    const total = await Task.countDocuments();
    const completed = await Task.countDocuments({ complete: true });
    const pending = await Task.countDocuments({ complete: false });

    res.json({
      success: true,
      data: {
        total,
        completed,
        pending
      }
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// BULK DELETE completed tasks
app.delete('/api/tasks/delete/completed', async (req, res) => {
  try {
    const result = await Task.deleteMany({ complete: true });
    
    res.json({ 
      success: true, 
      message: `Deleted ${result.deletedCount} completed tasks`,
      data: result 
    });
  } catch (error) {
    console.error('Error deleting completed tasks:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running with MongoDB' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📝 Frontend should connect to: http://localhost:${PORT}/api`);
  console.log(`🗄️  Database: MongoDB`);
});
