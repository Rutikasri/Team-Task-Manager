import { useEffect, useState } from "react"

import Sidebar from "../components/Sidebar"

import API from "../services/api"

import toast from "react-hot-toast"

function Tasks() {

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const [tasks, setTasks] = useState([])

  const [users, setUsers] = useState([])

  const [projects, setProjects] = useState([])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    project: "",
    dueDate: "",
  })

  useEffect(() => {

    fetchTasks()
    fetchProjects()
    fetchUsers()

  }, [])

  const fetchTasks = async () => {

    try {

      const res = await API.get("/tasks")

      setTasks(res.data)

    } catch (error) {

      toast.error(error.response.data.message)

    }
  }

  const fetchProjects = async () => {

    try {

      const res = await API.get("/projects")

      setProjects(res.data)

    } catch (error) {

      toast.error(error.response.data.message)

    }
  }

  const fetchUsers = async () => {

    try {

      const res = await API.get("/auth/users")

      setUsers(res.data)

    } catch (error) {

      toast.error(error.response.data.message)

    }
  }

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await API.post(
        "/tasks",
        {
          ...formData,
          status: "TODO",
        }
      )

      toast.success("Task assigned")

      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        project: "",
        dueDate: "",
      })

      fetchTasks()

    } catch (error) {

      toast.error(error.response.data.message)

    }
  }

  const updateTaskStatus = async (
    taskId,
    status
  ) => {

    try {

      await API.put(
        `/tasks/${taskId}`,
        {
          status,
        }
      )

      toast.success("Task updated")

      fetchTasks()

    } catch (error) {

      toast.error(error.response.data.message)

    }
  }

  const deleteTask = async (
    taskId
  ) => {

    try {

      await API.delete(
        `/tasks/${taskId}`
      )

      toast.success("Task deleted")

      fetchTasks()

    } catch (error) {

      toast.error(error.response.data.message)

    }
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <div className="ml-72 p-10 w-full">

        <h1 className="text-5xl font-bold mb-10">
          Tasks
        </h1>

        {
          user.role === "ADMIN" && (

            <form
              onSubmit={handleSubmit}
              className="bg-slate-900 p-6 rounded-3xl mb-10"
            >

              <h2 className="text-2xl font-bold mb-6 text-cyan-400">
                Assign Task
              </h2>

              <input
                type="text"
                name="title"
                placeholder="Task Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-800 mb-4 outline-none"
              />

              <textarea
                name="description"
                placeholder="Task Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-800 mb-4 outline-none"
              />

              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-800 mb-4 outline-none"
              >

                <option value="">
                  Select Member
                </option>

                {
                  users.map((user) => (

                    <option
                      key={user._id}
                      value={user._id}
                    >
                      {user.name}
                    </option>

                  ))
                }

              </select>

              <select
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-800 mb-4 outline-none"
              >

                <option value="">
                  Select Project
                </option>

                {
                  projects.map((project) => (

                    <option
                      key={project._id}
                      value={project._id}
                    >
                      {project.title}
                    </option>

                  ))
                }

              </select>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-800 mb-4 outline-none"
              />

              <button className="bg-cyan-500 hover:bg-cyan-600 duration-300 px-6 py-3 rounded-xl font-semibold">
                Assign Task
              </button>

            </form>

          )
        }

        <div className="grid grid-cols-3 gap-6">

          {
            tasks.map((task) => (

              <div
                key={task._id}
                className="bg-slate-900 p-6 rounded-3xl hover:scale-105 duration-300"
              >

                <h2 className="text-2xl text-cyan-400 font-bold mb-3">
                  {task.title}
                </h2>

                <p className="text-slate-400 mb-4">
                  {task.description}
                </p>

                <p className="mb-2">
                  Assigned To:
                  {" "}
                  {task.assignedTo?.name}
                </p>

                <p className="mb-4">
                  Project:
                  {" "}
                  {task.project?.title}
                </p>

                <select
                  value={task.status}
                  onChange={(e) =>
                    updateTaskStatus(
                      task._id,
                      e.target.value
                    )
                  }
                  className="bg-slate-800 px-4 py-2 rounded-xl outline-none"
                >

                  <option value="TODO">
                    TODO
                  </option>

                  <option value="IN_PROGRESS">
                    IN PROGRESS
                  </option>

                  <option value="COMPLETED">
                    COMPLETED
                  </option>

                </select>

                {
                  user.role === "ADMIN" && (

                    <button
                      onClick={() =>
                        deleteTask(task._id)
                      }
                      className="mt-4 bg-red-500 hover:bg-red-600 duration-300 px-4 py-2 rounded-xl block"
                    >
                      Delete Task
                    </button>

                  )
                }

              </div>

            ))
          }

        </div>

      </div>

    </div>
  )
}

export default Tasks