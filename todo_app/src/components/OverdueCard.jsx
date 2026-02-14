import React from 'react'
import { FaTrash, FaEdit, FaEye } from "react-icons/fa"

const OverdueCard = ({tasks ,deleteTask, complete, setEditingTask, setViewTask}) => {

    if (tasks.length === 0) {
        return (
          <p className="text-gray-400 border-2 border-gray-200 rounded h-128 flex items-center justify-center">
            No tasks yet. Add a new task
          </p>
        )
      }

      const priorityColors = {
        low: "bg-green-200 text-gray-700",
        medium: "bg-yellow-400 text-white",
        high: "bg-red-600 text-white"
      }

  return (
    <div className="flex flex-col border-2 border-gray-200 rounded shadow-sm h-auto md:h-128 max-h-[420px] overflow-y-auto">
      {tasks.map((task) => (

        <div key={task.id} className="flex  md:flex-row md:items-center border-2 border-gray-200 p-3 md:p-4 rounded m-2 shadow-sm">

          <input
            type='checkbox'
            checked={task.done}
            onChange={() => complete(task.id , task.done)}
            className="w-4 h-4 accent-purple-600 cursor-pointer mr-3"
          />
         
            <p className="font-medium text-sm md:text-base flex-1">
              {task.text}
            </p>

          <div className='flex items-center gap-4'>
            <div className="flex items-center gap-4 w-[220px] justify-start">

              <p className="text-xs md:text-sm text-gray-500 w-[100px] text-left">
                {new Date(task.date).toLocaleDateString("tr-TR")}
              </p>

              <span className={`inline-flex items-center justify-center w-[90px] px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${priorityColors[task.priority]}`}>{task.priority}</span>
            </div> 

            <button
              onClick={() => setViewTask(task)}
              className="p-2 rounded hover:bg-gray-100"
            >
              <FaEye className="text-gray-500 hover:text-[#6D28D9]" />
            </button>

            <button 
              className="p-2 rounded hover:bg-gray-100 transition"
              onClick={() => setEditingTask(task)}
            >
              <FaEdit className="text-gray-500 text-lg hover:text-blue-600"  />
            </button>
            <button className='mt-2 p-2 rounded hover:bg-red-100 transition' onClick={()=>deleteTask(task.id)}>
              <FaTrash className="text-red-500 text-lg hover:text-red-600"/>
            </button>

          </div>
        </div>
      ))}
    </div>
  )
}

export default OverdueCard
