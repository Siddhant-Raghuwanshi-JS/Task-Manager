import { useContext, useState } from "react"
import TaskList from "./TaskList"
import Filter from "./Filter"
import Header from "./Header"
import { TaskContext } from "../context/TaskContext"

function TaskForm() {

    const [input, setInput] = useState("")
    const [category, setCategory] = useState("Work");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");

    const { addTask } = useContext(TaskContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(input, category, priority, dueDate);
        setInput("")
        setDueDate("");
    }

    return (
        <>
            <Header />

            <form className="input-box" onSubmit={handleSubmit}>
                <input className="input" type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter a new task" />

                <select className="input-category" value={category} onChange={(e) =>setCategory(e.target.value)}>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Study">Study</option>
                </select>

                <select className="input-priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>

                </select>

                <input className="input-dueDate" type="date" value={dueDate}  onChange={(e)=> setDueDate(e.target.value)}/>

                <button className="btn-1">Add task</button>
            </form>

            <hr />
            <Filter />
            <hr />
            <TaskList />
        </>
    )

}

export default TaskForm