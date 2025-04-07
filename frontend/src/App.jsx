import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'; // Import the axios library

// Replace with your Render backend URL once deployed!
const API_URL = 'https://todo-backend-api-khwh.onrender.com/api/';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editTask, setEditTask] = useState(null);
    const [editedTaskText, setEditedTaskText] = useState('');
    const [filter, setFilter] = useState('all');
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(true); // To handle loading state
    const [error, setError] = useState(null);    // To handle potential errors

    useEffect(() => {
        fetchTasks(); // Fetch tasks when the component mounts
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_URL);
            setTasks(response.data);
        } catch (err) {
            setError(err.message);
            setTasks([]);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async () => {
        if (!newTask.trim()) return;
        try {
            const response = await axios.post(API_URL, { title: newTask });
            setTasks([...tasks, response.data]); // Add the task returned by the API
            setNewTask('');
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}${id}/`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const startEditTask = (task) => {
        setEditTask(task);
        setEditedTaskText(task.title);
    };

    const updateTask = async () => {
        if (!editTask || !editedTaskText.trim()) return;
        try {
            const response = await axios.put(`${API_URL}${editTask.id}/`, {
                title: editedTaskText,
                completed: editTask.completed, // Include completed status
            });
            setTasks(tasks.map(task =>
                task.id === response.data.id ? response.data : task
            ));
            setEditTask(null);
            setEditedTaskText('');
        } catch (err) {
            setError(err.message);
        }
    };

    const toggleComplete = async (taskToUpdate) => {
        try {
            const response = await axios.put(`${API_URL}${taskToUpdate.id}/`, {
                title: taskToUpdate.title,
                completed: !taskToUpdate.completed, // Toggle completed status
            });
            setTasks(tasks.map(task =>
                task.id === response.data.id ? response.data : task
            ));
        } catch (err) {
            setError(err.message);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') return true;
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', darkMode);
    };

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    if (error) {
        return <div>Error loading tasks: {error}</div>;
    }

    return (
        <div className={`todo-container ${darkMode ? 'dark-mode' : ''}`}>
            <button className="dark-mode-toggle" onClick={toggleDarkMode} style={{ position: 'absolute', top: '15px', left: '15px' }}>
                {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </button>
            <h1 style={{ textAlign: 'center', width: '100%', marginBottom: '25px' }}>To-Do List</h1>
            <div style={{ display: 'flex', justifyContent: 'center', width: '80%', marginBottom: '15px' }}>
                <input
                    type="text"
                    placeholder="Add a new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    style={{ width: '100%', padding: '15px', border: '1px solid #ccc', borderRadius: '8px', fontSize: '18px' }}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%', marginBottom: '20px' }}>
                <button className="add-task" onClick={addTask} style={{ width: '150px' }}>Add Task</button>
                <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ width: '150px', marginTop: '10px' }}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>
            </div>
            <ul>
                {tasks.length === 0 ? (
                    <li>No tasks found.</li>
                ) : (
                    filteredTasks.map((task) => (
                        <li key={task.id} className={`${task.completed ? 'completed' : ''} task-item`}>
                            {editTask && editTask.id === task.id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editedTaskText}
                                        onChange={(e) => setEditedTaskText(e.target.value)}
                                    />
                                    <button onClick={updateTask} style={{ padding: '5px 10px', fontSize: '12px' }}>Save</button>
                                    <button onClick={() => setEditTask(null)} style={{ padding: '5px 10px', fontSize: '12px' }}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleComplete(task)}
                                    />
                                    <span style={{ fontSize: '16px', marginRight: '10px', cursor: 'pointer' }} onClick={() => startEditTask(task)}>{task.title}</span>
                                    <button onClick={() => startEditTask(task)} style={{ padding: '5px 10px', fontSize: '12px' }}>Edit</button>
                                    <button onClick={() => deleteTask(task.id)} style={{ padding: '5px 10px', fontSize: '12px' }}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default App;