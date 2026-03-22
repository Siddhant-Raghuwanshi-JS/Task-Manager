import { useContext } from "react"
import TaskItem from "./TaskItem"
import { TaskContext } from "../context/TaskContext"


function TaskList () {

    const {filteredTask} = useContext(TaskContext);

    return (
        <>
            <ul >
                {filteredTask.map((item) => (
                    <TaskItem
                        key={item.id}
                        item={item}
                         />
                ))}
            </ul>
        </>
    )
}

export default TaskList