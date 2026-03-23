import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://task-manager-backend-rm35.onrender.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Task API endpoints
export const taskAPI = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await apiClient.get('/tasks');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Get single task
  getTask: async (id) => {
    try {
      const response = await apiClient.get(`/tasks/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw error;
    }
  },

  // Create new task
  createTask: async (task, category, priority, dueDate, description = '') => {
    try {
      const response = await apiClient.post('/tasks', {
        task,
        category,
        priority,
        dueDate,
        description
      });
      return response.data.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update task
  updateTask: async (id, updates) => {
    try {
      const response = await apiClient.put(`/tasks/${id}`, updates);
      return response.data.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete task
  deleteTask: async (id) => {
    try {
      const response = await apiClient.delete(`/tasks/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  // Toggle task completion
  toggleTask: async (id) => {
    try {
      const response = await apiClient.patch(`/tasks/${id}/toggle`);
      return response.data.data;
    } catch (error) {
      console.error('Error toggling task:', error);
      throw error;
    }
  },

  // Get statistics
  getStatistics: async () => {
    try {
      const response = await apiClient.get('/statistics');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  },

  // Delete all completed tasks
  deleteCompletedTasks: async () => {
    try {
      const response = await apiClient.delete('/tasks/delete/completed');
      return response.data;
    } catch (error) {
      console.error('Error deleting completed tasks:', error);
      throw error;
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
};

export default apiClient;
