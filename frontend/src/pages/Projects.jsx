import { useEffect, useState } from "react"

import Sidebar from "../components/Sidebar"

import API from "../services/api"

import toast from "react-hot-toast"

function Projects() {

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const [projects, setProjects] = useState([])

  const [users, setUsers] = useState([])

  const [selectedMembers, setSelectedMembers] = useState([])

  const [editingProject, setEditingProject] = useState(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })

  useEffect(() => {

    fetchProjects()
    fetchUsers()

  }, [])

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

  const handleMemberSelect = (e) => {

    const value = Array.from(
      e.target.selectedOptions,
      option => option.value
    )

    setSelectedMembers(value)
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      if (editingProject) {

        await API.put(
          `/projects/${editingProject}`,
          {
            ...formData,
            teamMembers: selectedMembers,
          }
        )

        toast.success("Project updated")

        setEditingProject(null)

      } else {

        await API.post(
          "/projects",
          {
            ...formData,
            teamMembers: selectedMembers,
          }
        )

        toast.success("Project created")
      }

      setFormData({
        title: "",
        description: "",
      })

      setSelectedMembers([])

      fetchProjects()

    } catch (error) {

      toast.error(error.response.data.message)

    }
  }

  const editProject = (project) => {

    setEditingProject(project._id)

    setFormData({
      title: project.title,
      description: project.description,
    })

    setSelectedMembers(
      project.teamMembers.map(
        (member) => member._id
      )
    )
  }

  const deleteProject = async (
    projectId
  ) => {

    try {

      await API.delete(
        `/projects/${projectId}`
      )

      toast.success("Project deleted")

      fetchProjects()

    } catch (error) {

      toast.error(error.response.data.message)

    }
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <div className="ml-72 p-10 w-full">

        <h1 className="text-5xl font-bold mb-10">
          Projects
        </h1>

        {
          user.role === "ADMIN" && (

            <form
              onSubmit={handleSubmit}
              className="bg-slate-900 p-6 rounded-3xl mb-10"
            >

              <h2 className="text-2xl font-bold mb-6 text-cyan-400">
                {
                  editingProject
                    ? "Edit Project"
                    : "Create Project"
                }
              </h2>

              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-800 mb-4 outline-none"
              />

              <textarea
                name="description"
                placeholder="Project Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-800 mb-4 outline-none"
              />

              <select
                multiple
                onChange={handleMemberSelect}
                className="w-full p-4 rounded-xl bg-slate-800 mb-4 outline-none h-40"
              >

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

              <button className="bg-cyan-500 hover:bg-cyan-600 duration-300 px-6 py-3 rounded-xl font-semibold">
                {
                  editingProject
                    ? "Update Project"
                    : "Create Project"
                }
              </button>

            </form>

          )
        }

        <div className="grid grid-cols-3 gap-6">

          {
            projects.map((project) => (

              <div
                key={project._id}
                className="bg-slate-900 p-6 rounded-3xl"
              >

                <h2 className="text-2xl text-cyan-400 font-bold mb-3">
                  {project.title}
                </h2>

                <p className="text-slate-400 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">

                  {
                    project.teamMembers?.map((member) => (

                      <span
                        key={member._id}
                        className="bg-cyan-500 px-3 py-1 rounded-full text-sm"
                      >
                        {member.name}
                      </span>

                    ))
                  }

                </div>

                {
                  user.role === "ADMIN" && (

                    <div className="flex gap-4">

                      <button
                        onClick={() =>
                          editProject(project)
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 duration-300 px-4 py-2 rounded-xl"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteProject(project._id)
                        }
                        className="bg-red-500 hover:bg-red-600 duration-300 px-4 py-2 rounded-xl"
                      >
                        Delete
                      </button>

                    </div>

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

export default Projects