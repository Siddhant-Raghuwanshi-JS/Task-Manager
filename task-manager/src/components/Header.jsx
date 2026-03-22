import  { useContext } from 'react'
import { TaskContext } from '../context/TaskContext'

function Header () {

const {totalTask,  completedTask, pendingTask } = useContext(TaskContext);

  return (
    <div>
      <h1 className='title'>Task Manager</h1>
      <div className='sub-headings'>
        <div>Total task:{totalTask}  |</div>
        <div>Completed:{ completedTask} |</div>
        <div> Pending:{pendingTask}</div>
      </div>
      <hr/>
    </div>
  )
}

export default Header
