import React from 'react'
// import { Link } from 'react-router-dom'
// import Header from '../components/Header'
import TaskForm from '../components/TaskForm'
import { TaskProvider } from '../context/TaskContext'

function Home () {

  return (
    <TaskProvider>
      <TaskForm/>
    </TaskProvider>
      
    
  )
}

export default Home
