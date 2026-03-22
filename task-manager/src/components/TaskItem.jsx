import React, { useContext, useEffect, useRef, useState } from 'react'
import { TaskContext } from '../context/TaskContext';

function TaskItem({ item }) {

    const { toggleTask, deleteTask, updateTask } = useContext(TaskContext);

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(item.task);

    useEffect(() => {
        setEditText(item.task);
    }, [item.task]);

    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleSave = () => {
        if (!editText.trim()) return;
        updateTask(item.id, editText);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditText(item.task);
        setIsEditing(false)
    }

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "High":
                return "red";
            case "Medium":
                return "orange";
            case "Low":
                return "green";
            default:
                return "gray";

        }
    };


    return (

        <li className='list' >

            <span onClick={() => toggleTask(item.id)}>
                {item.complete ? "✅" : "⭕"}
            </span>

            <span
                style={{
                    backgroundColor: getPriorityColor(item.priority),
                    padding: "2px 8px",
                    borderRadius: "10px",
                    color: "white",
                    marginLeft: "10px"
                }}
            >
                {item.priority}
            </span>

            {isEditing ? (
                <>
                    <input type="text" ref={inputRef} value={editText} onChange={(e) => setEditText(e.target.value)} />
                    <button className='save-btn' onClick={handleSave}>Save</button>
                    <button className='cancel-btn' onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <div onDoubleClick={() => setIsEditing(true)}>

                        {item.task}

                        <div style={{ fontSize: "12px", color: "gray" }}>
                            {item.category} | Due: {item.dueDate || "No date"}
                        </div>

                    </div>
                </>
            )

            }

            <div className='list-btn'>
                <button className='edit-btn' onClick={() => setIsEditing(true)}>Edit</button>
                <button className='delete-btn' onClick={() => deleteTask(item.id)
                }>Delete</button>

            </div>


        </li>


    )
}

export default TaskItem
