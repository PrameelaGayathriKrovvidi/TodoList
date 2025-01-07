import React from 'react'

function Home() {
    return (
        <div className="Home">
        <form className="task-form">
            <input type = "text" placeholder="Enter task" className="task-input"></input> 
            <button className="add-task-button">ADD TASK</button>
            </form>
            <div className="task-sections">
                <div className="task-section">
                    <h2>To-do Tasks</h2>
                </div>
                <div className="task-section">
                    <h2>Ongoing Tasks</h2>
                </div>
                <div className="task-section">
                    <h2>Completed Tasks</h2>
                </div>
            </div>
        </div>
    );
}

export default Home;
