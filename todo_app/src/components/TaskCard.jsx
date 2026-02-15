import React, { useState , useEffect} from 'react' 
import axios from "axios"
import { FaPlus } from "react-icons/fa"
import ButtonCard from './ButtonCard'
import TodayCard from './TodayCard'
import PendingCard from './PendingCard'
import OverdueCard from './OverdueCard'
import CompleteCard from './CompleteCard'

const TaskCard = () => {
  
    const [selected, setSelected] = useState("today")

    const [newTask, setNewtask] = useState("")

    const[showPopup, setShowPopup] = useState(false)

    const[priority, setPriority] = useState("")

    const[date,setDate] = useState("")

    const[Comments,setComment] = useState("")

    const [editingTask, setEditingTask] = useState(null)

    const [task, setTask] = useState([])

    const [mode, setMode] = useState("new") 

    const [viewTask, setViewTask] = useState(null)

    const API = "https://todo-app-t4ws.onrender.com";


    useEffect(()=>{
      axios.get(`${API}/tasks`)
        .then(res=> setTask(res.data))
    },[])
  
    //add and edit
    const saveTask = async () =>{
      if( newTask.trim() === "") return

      if(editingTask){
        await axios.put(
          `${API}/tasks/${editingTask.id}`,
          {
            text: newTask,
            date,
            priority,
            comments: Comments
          }
        )
      }
        
      else{

        await axios.post(`${API}/tasks`,

          {
             text: newTask,
            priority,
            date,
            comments: Comments,
            status: selected 
          }
        
        )

      }
      
      const res = await axios.get(`${API}/tasks`)
      setTask(res.data)

      setEditingTask(null)
      setViewTask(null)
      setNewtask("")
      setDate("")
      setPriority("")
      setComment("")
      setMode("new")
      setShowPopup(false)
    }

    // when you complete the task
    const complete = async (id, currentDone) =>{

      await axios.patch(`${API}/tasks/${id}`, {
        done: !currentDone
      })

      const res = await axios.get(`${API}/tasks`)
      setTask(res.data)
  
    }

    const todayTasks = task.filter(t => t.status === "today" && !t.done)
    const pendingTasks = task.filter(t => t.status === "pending" &&  !t.done)
    const overdueTasks = task.filter (t=> t.status === "overdue" &&  !t.done)
    const completedTasks = task.filter(t => t.done)


  
    const deleteTask = async(id) => {

      await axios.delete(`${API}/tasks/${id}`)

      const res = await axios.get(`${API}/tasks`)
      setTask(res.data)
      
    }

    useEffect(()=>{
      if(editingTask){
        setNewtask(editingTask.text),
        setPriority(editingTask.priority),
        setDate(editingTask.date),
        setComment(editingTask.comments)
        setShowPopup(true),
        setMode("edit")
      }
    },[editingTask])

    useEffect(()=>{
      if(viewTask){
        setNewtask(viewTask.text),
        setPriority(viewTask.priority),
        setDate(viewTask.date),
        setComment(viewTask.comments),
        setShowPopup(true),
        setMode("view")
      }
    },[viewTask])

    return (
        
      <section className="flex flex-col items-center mt-6 mb-10">
        <ButtonCard selected={selected} setSelected={setSelected} />
  
        <div className="flex justify-between items-center md:w-[80%] lg:w-[60%] mb-4 mt-10 shadow:md">
          <h1 className="text-black font-bold text-xl">
            Task
          </h1>
  
          <button className="bg-[#6D28D9] text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 shadow-md hover:bg-[#8B5CF6] active:bg-[#6D28D9]" onClick={() => setShowPopup(true)}>
            <FaPlus className="text-sm" />
            <span className="font-medium">Add</span>
          </button>
        </div>
        

        <div className="bg-white shadow-sm py-5 px-5 md:w-[80%] lg:w-[60%] rounded-xl">
            <div>
                {selected === "today" && <TodayCard 
                    tasks={todayTasks}
                    deleteTask={deleteTask}
                    complete={complete}
                    setEditingTask={setEditingTask}
                    setViewTask={setViewTask}/>
                }

                {selected === "pending" && <PendingCard 
                    tasks={pendingTasks} 
                    deleteTask={deleteTask}
                    complete={complete}
                    setEditingTask={setEditingTask}
                    setViewTask={setViewTask}/>
                }

                {selected === "overdue" && <OverdueCard 
                    tasks={overdueTasks}  
                    deleteTask={deleteTask}
                    complete={complete}
                    setEditingTask={setEditingTask}
                    setViewTask={setViewTask}/>
                }

            </div>
            <div className="mt-6">
              <CompleteCard tasks={completedTasks}  deleteTask={deleteTask} complete={complete}/>
            </div>

        </div>
        {showPopup && (
                  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">

                      <h2 className="text-lg font-semibold mb-4">
                        Task Details
                      </h2>

                      <h1 className='text-sm mb-4'>
                        Title
                      </h1>

                      <input
                        type='text'
                        className="border p-2 w-full rounded mb-4"
                        value={newTask}
                        onChange={(e) => setNewtask(e.target.value)}
                        placeholder="Task name..."
                        disabled={mode === "view"}
                      />

                      <div className='flex items-center gap-4 w-full'> 
                        <div className='flex flex-col w-1/2'>
                          <h2 className='text-sm mb-4'>
                            Priority
                          </h2>

                          <select
                          className='bg-white border py-1 px-1 lg:py-2 mb-4 rounded-sm'
                          value={priority} 
                          onChange={(e)=> setPriority(e.target.value)}
                          disabled={mode === "view"}
                          >
                            <option value="" disabled>
                              Select priority
                            </option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>

                          </select>
                        </div>

                        <div className='flex flex-col w-1/2'>

                          <h2 className='text-sm mb-4'>
                            Deadline
                          </h2>

                          <input 
                          type="date"
                          className='border py-1 px-1 lg:py-2 w-full rounded-sm mb-4'
                          value={date}
                          onChange={(e)=>setDate(e.target.value)}
                          disabled={mode === "view"}
                          />

                        </div>
                      
                      </div>

                      <h1 className='text-sm mb-4'>
                          Comments
                      </h1>

                      <textarea 
                        className='border p-3 w-full rounded mb-4 h-32 resize-none'
                        value={Comments}
                        onChange={(e)=> setComment(e.target.value)}
                        placeholder="Write a comment"
                        disabled={mode === "view"}
                      />

                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setShowPopup(false)
                            setPriority("")
                            setDate("")
                            setNewtask("")
                            setComment("")
                            setEditingTask(null)
                            setViewTask(null)
                            setMode("new")
                          }}
                          className={`px-4 py-2 border rounded ${mode ==='view' ? " bg-[#6D28D9] text-white border-[#6D28D9] hover:bg-[#7C3AED]" : "bg-white text-black border hover:bg-gray-100"}`}
                        
                        >
                          Cancel
                        </button>

                        {mode !== "view" && (
                            <button
                              onClick={saveTask}
                              className="px-4 py-2 bg-[#6D28D9] text-white rounded hover:bg-[#7C3AED]"
                            >
                              {mode === "edit" ? "Update" : "Add"}
                            </button>
                          )}
                      </div>

                    </div>
                  </div>
                )}
  
      </section>
    )
  }
  
  export default TaskCard
