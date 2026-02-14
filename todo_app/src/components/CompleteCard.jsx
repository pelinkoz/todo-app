import React from 'react'
import { FaTrash, FaUndo } from "react-icons/fa"
import { taskExample } from '../interface/taskexample'

const CompleteCard = ({ tasks, deleteTask, complete }) => {

  const completedTasks = tasks.filter(task => task.done);
  const displayTasks = completedTasks.length === 0 ? [taskExample] : completedTasks;

  const priorityColors = {
    low: "bg-green-200 text-gray-700",
    medium: "bg-yellow-400 text-white",
    high: "bg-red-600 text-white"
  }

  return (
    <>
        <div className='text-bold text-gray-600 p-2'>
            <p>Completed</p>
        </div>
        
        <div className="flex flex-col border-2 border-gray-200 rounded shadow-sm h-auto md:h-64 max-h-[260px] overflow-y-auto">
            
        {displayTasks.map(task => (
            <div 
            key={task.id} 
            className="flex md:flex-row md:items-center border-2 border-gray-200 p-3 md:p-4 rounded m-2 shadow-sm opacity-70"
            >

            <p className="font-medium text-gray-400 text-sm md:text-base flex-1 line-through">
                {task.text}
            </p>

            <div className='flex items-center gap-4'>
                <p className="text-xs md:text-sm text-gray-500 w-[100px] text-left">
                {new Date(task.date).toLocaleDateString("tr-TR")}
                </p>

                <button className='p-2 rounded hover:bg-gray-100' onClick={() => complete(task.id, task.done)}>
                  <FaUndo className='text-gray-500 hover:text-[#6D28D9]'/>
                </button>

                <span className={`inline-flex items-center justify-center w-[90px] px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${priorityColors[task.priority]}`}>
                {task.priority}
                </span>

                <button 
                className='p-2 rounded hover:bg-red-100 transition'
                onClick={() => deleteTask(task.id)}
                >
                <FaTrash className="text-red-500 text-lg hover:text-red-600"/>
                </button>
            </div>
            </div>
        ))}

        </div>
    </> 
  )
}

export default CompleteCard
