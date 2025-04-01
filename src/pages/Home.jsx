import React, { useState } from 'react';

function Home() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState({ todo: [], ongoing: [], completed: [] });
    const [isEditing, setIsEditing] = useState(false);
    const [editCategory, setEditCategory] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const handleInputChange = (e) => {
        setTask(e.target.value);
    };

    // Add task to "To-Do" section
    const addTask = () => {
        if (task.trim() !== '') {
            setTasks((prevTasks) => ({
                ...prevTasks,
                todo: [...prevTasks.todo, task],
            }));
            setTask(''); // Clear input
        }
    };

    // Move task to another category
    const moveTask = (currentCategory, targetCategory, taskToMove) => {
        setTasks((prevTasks) => {
            // Remove task from category
            const updatedCurrent = prevTasks[currentCategory].filter(
                (t) => t !== taskToMove
            );

            // Add task to target category
            const updatedTarget = [...prevTasks[targetCategory], taskToMove];
            return { ...prevTasks, [currentCategory]: updatedCurrent, [targetCategory]: updatedTarget };
        });
    };

    // Clear all tasks in a category
    const clearTasks = (category) => {
        setTasks((prevTasks) => ({
            ...prevTasks,
            [category]: [],
        }));
    };

   // Start editing a task
   const startEditing = (category, index) => {
    setTask(tasks[category][index]); // Load the task into the input field
    setIsEditing(true);
    setEditCategory(category);
    setEditIndex(index);
};

// Save the edited task
const saveEditedTask = () => {
    if (task.trim() !== '') {
        setTasks((prevTasks) => {
            const updatedCategory = [...prevTasks[editCategory]];
            updatedCategory[editIndex] = task; // Update the task in the specific category
            return { ...prevTasks, [editCategory]: updatedCategory };
        });
        setTask(''); // Clear input
        setIsEditing(false);
        setEditCategory('');
        setEditIndex(null);
    }
};

return (
    <div className="home">
        <form
            className="task-form"
            onSubmit={(e) => {
                e.preventDefault();
                isEditing ? saveEditedTask() : addTask();
            }}
        >
            <input
                type="text"
                placeholder="Enter task"
                className="task-input"
                value={task}
                onChange={handleInputChange}
            />
            <button
                type="button"
                className="add-task-button"
                onClick={isEditing ? saveEditedTask : addTask}
            >
                {isEditing ? 'Save Task' : 'New Task'}
            </button>
        </form>
        <div className="task-sections">
            {/* To-Do Section */}
            <div className="task-section">
                <header className="section-header">
                    <h2>To do</h2>
                </header>
                <ul>
                    {tasks.todo.map((t, index) => (
                        <li key={index}>
                            {t}
                            <button
                                type="button"
                                className="task-button"
                                onClick={() => moveTask('todo', 'ongoing', t)}
                                style={{ marginLeft: '10px' }}
                            >
                                In progress
                            </button>
                            <button
                                type="button"
                                className="task-button"
                                onClick={() => moveTask('todo', 'completed', t)}
                                style={{ marginLeft: '10px' }}
                            >
                                Done
                            </button>
                            <button
                                type="button"
                                className="task-button"
                                onClick={() => startEditing('todo', index)}
                                style={{ marginLeft: '10px' }}
                            >
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    type="button"
                    className="clear-button"
                    onClick={() => clearTasks('todo')}
                >
                    Clear all
                </button>
            </div>

            {/* Ongoing Section */}
            <div className="task-section">
                <header className="section-header">
                    <h2>In progress</h2>
                </header>
                <ul>
                    {tasks.ongoing.map((t, index) => (
                        <li key={index}>
                            {t}
                            <button
                                type="button"
                                className="task-button"
                                onClick={() => moveTask('ongoing', 'completed', t)}
                                style={{ marginLeft: '10px' }}
                            >
                                Done
                            </button>
                            <button
                                type="button"
                                className="task-button"
                                onClick={() => moveTask('ongoing', 'todo', t)}
                                style={{ marginLeft: '10px' }}
                            >
                                To do
                            </button>
                            <button
                                type="button"
                                className="task-button"
                                onClick={() => startEditing('ongoing', index)}
                                style={{ marginLeft: '10px' }}
                            >
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    type="button"
                    className="clear-button"
                    onClick={() => clearTasks('ongoing')}
                >
                    Clear all
                </button>
            </div>

            {/* Completed Section */}
            <div className="task-section">
                <header className="section-header">
                    <h2>Done</h2>
                </header>
                <ul>
                    {tasks.completed.map((t, index) => (
                        <li key={index}>
                            {t}
                            <button
                                type="button"
                                className="task-button"
                                onClick={() => startEditing('completed', index)}
                                style={{ marginLeft: '10px' }}
                            >
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    type="button"
                    className="clear-button"
                    onClick={() => clearTasks('completed')}
                >
                    Clear all
                </button>
            </div>
        </div>
    </div>
);
}

export default Home;
