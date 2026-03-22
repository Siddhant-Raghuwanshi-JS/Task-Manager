import { createContext, useEffect, useState } from "react";
import { taskAPI } from "../utils/api";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [task, setTask] = useState([]);
    const [filter, setFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch tasks from API on mount
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await taskAPI.getAllTasks();
            setTask(data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            setError("Failed to load tasks");
            // Fallback to localStorage if API fails
            const savedTask = localStorage.getItem("task");
            if (savedTask) {
                setTask(JSON.parse(savedTask));
            }
        } finally {
            setLoading(false);
        }
    };

    // Save to localStorage as backup
    useEffect(() => {
        localStorage.setItem("task", JSON.stringify(task));
    }, [task]);

    const addTask = async (text, category, priority, dueDate) => {
        if (text.trim() === "") return;

        try {
            setError(null);
            const newTask = await taskAPI.createTask(text, category, priority, dueDate);
            setTask(prev => [...prev, newTask]);
        } catch (err) {
            console.error("Error adding task:", err);
            setError("Failed to add task");
        }
    };

    const deleteTask = async (id) => {
        try {
            setError(null);
            await taskAPI.deleteTask(id);
            setTask(prev => prev.filter(task => task.id !== id && task._id !== id));
        } catch (err) {
            console.error("Error deleting task:", err);
            setError("Failed to delete task");
        }
    };

    const toggleTask = async (id) => {
        try {
            setError(null);
            const updatedTask = await taskAPI.toggleTask(id);
            setTask(prev => prev.map(task => task.id === id || task._id === id ? updatedTask : task));
        } catch (err) {
            console.error("Error toggling task:", err);
            setError("Failed to toggle task");
        }
    };

    const updateTask = async (id, newText) => {
        if (!newText.trim()) return;

        try {
            setError(null);
            const updatedTask = await taskAPI.updateTask(id, { task: newText });
            setTask(prev => prev.map(task => task.id === id || task._id === id ? updatedTask : task));
        } catch (err) {
            console.error("Error updating task:", err);
            setError("Failed to update task");
        }
    };

    const filteredTask = task.filter((task) => {
        let statusMatch;
        switch (filter) {
            case "complete":
                statusMatch = task.complete;
                break;
            case "pending":
                statusMatch = !task.complete;
                break;
            default:
                statusMatch = true;
        }

        const categoryMatch =
            categoryFilter === "All" || task.category === categoryFilter;

        const priorityMatch =
            priorityFilter === "All" || task.priority === priorityFilter;

        return statusMatch && categoryMatch && priorityMatch;
    });

    const totalTask = task.length;
    const completedTask = task.filter(task => task.complete).length;
    const pendingTask = task.filter(task => !task.complete).length;

    return (
        <TaskContext.Provider
            value={{
                task,
                filteredTask,
                filter,
                setFilter,
                addTask,
                deleteTask,
                toggleTask,
                totalTask,
                completedTask,
                pendingTask,
                updateTask,
                categoryFilter,
                setCategoryFilter,
                priorityFilter,
                setPriorityFilter,
                loading,
                error,
                fetchTasks
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};