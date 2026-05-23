import { Link, useNavigate } from "react-router-dom"
import {
  MdDashboard,
} from "react-icons/md"

import {
  FaTasks,
  FaProjectDiagram,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa"

function Sidebar() {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"))

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    navigate("/")
  }

  return (
    <div className="w-72 h-screen fixed bg-slate-900 text-white p-6 flex flex-col justify-between border-r border-slate-800">

      <div>

        <h1 className="text-4xl font-bold text-cyan-400 mb-10">
          TaskFlow
        </h1>

        <div className="bg-slate-800 p-5 rounded-3xl mb-10 shadow-lg border border-slate-700">

          <div className="flex items-center gap-4">

            <div className="text-5xl text-cyan-400">
              <FaUserCircle />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                {user?.name}
              </h2>

              <p className="text-sm text-slate-400">
                {user?.email}
              </p>

              <span className="inline-block mt-2 bg-cyan-500 px-3 py-1 rounded-full text-xs font-semibold">
                {user?.role}
              </span>
            </div>

          </div>

        </div>

        <div className="flex flex-col gap-6 text-lg">

          <Link
            to="/dashboard"
            className="hover:text-cyan-400 duration-300 flex items-center gap-3"
          >
            <MdDashboard />
            Dashboard
          </Link>

          <Link
            to="/projects"
            className="hover:text-cyan-400 duration-300 flex items-center gap-3"
          >
            <FaProjectDiagram />
            Projects
          </Link>

          <Link
            to="/tasks"
            className="hover:text-cyan-400 duration-300 flex items-center gap-3"
          >
            <FaTasks />
            Tasks
          </Link>

        </div>

      </div>

      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 duration-300 p-4 rounded-2xl font-semibold shadow-lg"
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  )
}

export default Sidebar