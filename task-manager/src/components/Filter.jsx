// import { useContext } from "react";
// import { TaskContext } from "../context/TaskContext";

// function Filter () {

//     const {filter, setFilter} = useContext(TaskContext)
//     return(
//         <div className="filter-div">
//             <button onClick={()=>setFilter("all")}>
//                 All
//             </button>

//             <button onClick={()=>setFilter("complete")}>
//                 Complete
//             </button>

//             <button onClick={()=>setFilter("pending")}>
//                 Pending
//             </button>
//         </div>
//     )
// }

// export default Filter;





import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskFilter() {

    const {
        filter,
        setFilter,
        categoryFilter,
        setCategoryFilter,
        priorityFilter,
        setPriorityFilter
    } = useContext(TaskContext);

    return (
        <div className="below-header">

            <select
                className="all-categories"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                
            >
                <option className="all-categories" value="All">All Categories</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Study">Study</option>
            </select>

            <select
                className="all-priorities"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                style={{ marginLeft: "10px" }}
            >
                <option value="All">All Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>

            <div className="filter-div">
                <button onClick={() => setFilter("all")}>
                    All
                </button>

                <button onClick={() => setFilter("complete")}>
                    Complete
                </button>

                <button onClick={() => setFilter("pending")}>
                    Pending
                </button>
            </div>

        </div>
    );
}

export default TaskFilter;