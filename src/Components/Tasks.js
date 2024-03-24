import React, { useState, useEffect } from 'react';
import './Tasks.css'; // Import your CSS file

const TaskItem = ({ task, index, onDelete, onMarkDone }) => (
    <div className="task-item">
        <div className="task-description">
            <span className="task-label">task {index + 1} :</span> {task.task}
        </div>
        <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6fd826b624074e14ef67fbf45dcdaca24db5893f4d301820902affee65e32e51?apiKey=6b2c18dd5a434af0bc296b4d166f3aea"
            alt="Delete icon"
            className="task-icon"
            onClick={() => onDelete(task.id)} // Call onDelete function with task ID
        />
        <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/CHECKMARK_ICON_URL.png" // Replace with your checkmark icon URL
            alt="Mark done icon"
            className="task-icon"
            onClick={() => onMarkDone(task.id)} // Call onMarkDone function with task ID
        />
    </div>
);

function Tasks({ userToken }) { // Accept userToken as a prop

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch tasks on component mount and upon userToken change
    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('http://127.0.0.1:8000/get_task', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: userToken }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }

                const data = await response.json();
                setTasks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, [userToken]);

    const handleCreateTask = async (newTask) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:8000/create_task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`, // Include user token in Authorization header
                },
                body: JSON.stringify({ task: newTask }), // Send newTask only
            });

            if (!response.ok) {
                throw new Error('Failed to create task');
            }

            const data = await response.json();
            setTasks([...tasks, data]); // Add newly created task to the state
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };


    const handleDeleteTask = async (taskId) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:8000/delete_task', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`, // Include user token in Authorization header
                },
                body: JSON.stringify({ id: taskId }), // Send task ID only
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            setTasks(updatedTasks);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMarkDone = async (taskId) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:8000/done_task', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`, // Include user token in Authorization header
                },
                body: JSON.stringify({ id: taskId }), // Send task ID only
            });

            if (!response.ok) {
                throw new Error('Failed to mark task as done');
            }

            const updatedTask = await response.json();
            const updatedTasks = tasks.map((task) => (task.id === taskId ? updatedTask : task));
            setTasks(updatedTasks);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            return (
            <>
                <div className="container">
                    <header className="header">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/54195aafce1f98a796bdf76e688dbe282c85cde1417b40e834168dfa0023b701?apiKey=6b2c18dd5a434af0bc296b4d166f3aea" alt="Task list icon" className="header-icon" />
                        <header className="app-title">
                            <h1 className="head-border">Todo</h1>
                        </header>
                    </header>
                    <main className="task-list">
                        <div className="task-items">
                            {isLoading && <p>Loading tasks...</p>}
                            {error && <p>Error: {error}</p>}
                            {tasks.length > 0 ? (
                                tasks.map((task, index) => (
                                    <TaskItem
                                        key={task.id}
                                        task={task.task}
                                        index={index}
                                        onDelete={() => handleDeleteTask(task.id)}
                                        onMarkDone={() => handleMarkDone(task.id)}
                                    />
                                ))
                            ) : (
                                <p>No tasks yet.</p>
                            )}
                            <div className="new-task-input">
                                <label htmlFor="newTask" className="visually-hidden">
                                    Enter new task
                                </label>
                                <form onSubmit={(e) => {
                                    e.preventDefault(); // Prevent default form submission behavior
                                    const newTask = e.target.elements.newTask.value.trim();
                                    if (newTask !== '') {
                                        handleCreateTask(newTask);
                                        e.target.elements.newTask.value = ''; // Clear input field after submission
                                    }
                                }}>
                                    <input
                                        type="text"
                                        id="newTask"
                                        placeholder="Enter new task here ..."
                                        className="new-task-field"
                                        aria-label="Enter new task"
                                        name="newTask" // Add name attribute for form submission
                                    />
                                    <button type="submit" className="new-task-icon">
                                        <img
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/45eb1d1018ed058287b22f47c27ebc08db94267a9ec6e37d1b9c064107181156?apiKey=6b2c18dd5a434af0bc296b4d166f3aea"
                                            alt="Add task icon"
                                            className=""
                                        />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            </>
            );

        </>
    );
}





export default Tasks;

