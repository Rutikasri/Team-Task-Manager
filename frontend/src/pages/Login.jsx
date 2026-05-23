import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import API from "../services/api"
import toast from "react-hot-toast"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      })

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data))
      toast.success("Login successful")

      navigate("/dashboard")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-cyan-900">
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl w-96"
      >
        <h1 className="text-4xl text-white font-bold text-center mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-xl mb-4 bg-white/20 text-white outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-xl mb-6 bg-white/20 text-white outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-cyan-500 hover:bg-cyan-600 duration-300 text-white p-3 rounded-xl font-bold">
          Login
        </button>

        <p className="text-center text-white mt-6">
          Don't have an account?
          <Link to="/signup" className="text-cyan-400 ml-2">
            Signup
          </Link>
        </p>
      </motion.form>
    </div>
  )
}

export default Login