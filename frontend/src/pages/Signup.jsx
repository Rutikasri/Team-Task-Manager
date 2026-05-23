import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import API from "../services/api"
import toast from "react-hot-toast"

function Signup() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const navigate = useNavigate()

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
        "/auth/signup",
        formData
      )
      
      toast.success("Signup successful")

      navigate("/")

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
          Signup
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-3 rounded-xl mb-4 bg-white/20 text-white outline-none"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 rounded-xl mb-4 bg-white/20 text-white outline-none"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 rounded-xl mb-6 bg-white/20 text-white outline-none"
          onChange={handleChange}
        />

        <button className="w-full bg-cyan-500 hover:bg-cyan-600 duration-300 text-white p-3 rounded-xl font-bold">
          Signup
        </button>

        <p className="text-center text-white mt-6">
          Already have an account?

          <Link
            to="/"
            className="text-cyan-400 ml-2"
          >
            Login
          </Link>
        </p>

      </motion.form>

    </div>
  )
}

export default Signup