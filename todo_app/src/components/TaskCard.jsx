import React, { useState , useEffect} from 'react' 
import ButtonCard from './ButtonCard'
import TodayCard from './TodayCard'

const TaskCard = () => {
  
    const [selected, setSelected] = useState("today")

    const [newTask, setNewtask] = useState("")

    const[showPopup, setShowPopup] = useState(false)

    const[priority, setPriority] = useState("")

    const[date,setDate] = useState("")

    const[Comments,setComment] = useState("")

    const [editingTask, setEditingTask] = useState(null)

    const [task, setTask] = useState(() => {
      const savedTasks = localStorage.getItem("tasks")
      return savedTasks ? JSON.parse(savedTasks) : []
    })
  
    useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(task))
    }, [task])

    //add and edit
    const saveTask = () =>{
      if( newTask.trim() === "") return

      if(editingTask){
        setTask(
          task.map(t=> 
            t.id === editingTask.id ? {...t, text: newTask, priority, date, Comments}: t)
        )
      }

      else{

        setTask([
          ...task,
          { 
            id:Date.now(), 
            text:newTask, 
            priority: priority,
            date:date,
            done:false 
          }
        ])

      }
      
      setEditingTask(null)
      setNewtask("")
      setDate("")
      setPriority("")
      setComment("")
      setShowPopup(false)
    }

    // when you complete the task
    const complete = (id) =>{
      setTask(
        task.map(t=>
          t.id === id ? { ...t, done: !t.done } : t)
      )

    }

    const deleteTask = (id) => {
      setTask(task.filter(task => task.id !== id))
    }

    
    useEffect(()=>{
      if(editingTask){
        setNewtask(editingTask.text),
        setPriority(editingTask.priority),
        setDate(editingTask.date),
        setComment(editingTask.Comments)
        setShowPopup(true)
      }
    },[editingTask])

    return (
        
      <section className="flex flex-col items-center mt-6">
        <ButtonCard selected={selected} setSelected={setSelected} />
  
        <div className="flex justify-between items-center md:w-[80%] lg:w-[60%] mb-4 mt-10 shadow:md">
          <h1 className="text-black font-bold text-xl">
            Task
          </h1>
  
          <button className="bg-[#6D28D9] text-white py-3 px-8 rounded-sm shadow-[#6B7280] hover:bg-[#8B5CF6] active:bg-[#6D28D9]" onClick={() => setShowPopup(true)}>
            Add
          </button>
        </div>
        

        <div className="bg-white shadow-sm py-5 px-5 md:w-[80%] lg:w-[60%] rounded-xl">
            <div>
                {selected === "today" && <TodayCard tasks={task} deleteTask={deleteTask} complete={complete} setEditingTask={setEditingTask}/>}
                {selected === "pending" && <div id="pending">pending</div>}
                {selected === "overdue" && <div id="overdue">overdue</div>}
                complete place
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
                          }}
                          className="px-4 py-2 border rounded"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={saveTask}
                          className="px-4 py-2 bg-[#6D28D9] text-white rounded"
                        >
                          {editingTask ? "Update" : "Add"}
                        </button>
                      </div>

                    </div>
                  </div>
                )}
  
      </section>
    )
  }
  
  export default TaskCard
