import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, 'Please provide a task description'],
      trim: true,
      minlength: [1, 'Task cannot be empty']
    },
    complete: {
      type: Boolean,
      default: false
    },
    category: {
      type: String,
      default: 'General',
      trim: true
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    dueDate: {
      type: Date,
      default: null
    },
    description: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Task', taskSchema);
