const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require("path")

const app = express()
app.use(cors())
app.use(express.json())

const dataPath = path.join(__dirname, "data", "tasks.json")

const readTasks = () => {
  const data = fs.readFileSync(dataPath, "utf-8")
  return JSON.parse(data)
}

const writeTasks = (tasks) => {
  fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2))
}

app.get("/tasks", (req, res) => {
  const tasks = readTasks()
  res.json(tasks)
})

app.post("/tasks", (req, res) => {
  const tasks = readTasks()

  const newTask = {
    id: Date.now(),
    ...req.body,
    done: false
  }

  tasks.push(newTask)
  writeTasks(tasks)

  res.status(201).json(newTask)
})

app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params
  const updatedData = req.body

  let tasks = readTasks()

  tasks = tasks.map(t =>
    t.id == id ? { ...t, ...updatedData } : t
  )

  writeTasks(tasks)
  res.json({ success: true })
})


app.put("/tasks/:id", (req, res) => {
  const { id } = req.params
  const updatedData = req.body

  let tasks = readTasks()

  tasks = tasks.map(t =>
    t.id == id ? { ...t, ...updatedData } : t
  )

  writeTasks(tasks)
  res.json({ success: true })
})


app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params

  let tasks = readTasks()
  tasks = tasks.filter(t => t.id != id)

  writeTasks(tasks)
  res.json({ success: true })
})

app.listen(3000, () => {
  console.log("http://localhost:3000")
})
