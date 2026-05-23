import { useEffect, useState } from "react"

import Sidebar from "../components/Sidebar"

import API from "../services/api"

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const [tasks, setTasks] = useState([])

  const [projects, setProjects] = useState([])

  useEffect(() => {

    fetchTasks()
    fetchProjects()

  }, [])

  const fetchTasks = async () => {

    try {

      const res = await API.get("/tasks")

      setTasks(res.data)

    } catch (error) {

      console.log(error)

    }
  }

  const fetchProjects = async () => {

    try {

      const res = await API.get("/projects")

      setProjects(res.data)

    } catch (error) {

      console.log(error)

    }
  }

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  )

  const pendingTasks = tasks.filter(
    (task) => task.status === "TODO"
  )

  const overdueTasks = tasks.filter((task) => {

    return (
      new Date(task.dueDate) < new Date() &&
      task.status !== "COMPLETED"
    )

  })

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <div className="ml-72 p-10 w-full">

        <h1 className="text-5xl font-bold mb-4">
          Welcome, {user.name}
        </h1>

        <p className="text-slate-400 text-lg mb-10">
          Role: {user.role}
        </p>

        <div className="grid grid-cols-5 gap-6">

          <div className="bg-slate-900 p-8 rounded-3xl">

            <h2 className="text-3xl text-cyan-400 font-bold">
              {projects.length}
            </h2>

            <p>Total Projects</p>

          </div>

          <div className="bg-slate-900 p-8 rounded-3xl">

            <h2 className="text-3xl text-cyan-400 font-bold">
              {tasks.length}
            </h2>

            <p>Total Tasks</p>

          </div>

          <div className="bg-slate-900 p-8 rounded-3xl">

            <h2 className="text-3xl text-green-400 font-bold">
              {completedTasks.length}
            </h2>

            <p>Completed</p>

          </div>

          <div className="bg-slate-900 p-8 rounded-3xl">

            <h2 className="text-3xl text-yellow-400 font-bold">
              {pendingTasks.length}
            </h2>

            <p>Pending</p>

          </div>

          <div className="bg-slate-900 p-8 rounded-3xl">

            <h2 className="text-3xl text-red-400 font-bold">
              {overdueTasks.length}
            </h2>

            <p>Overdue</p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard