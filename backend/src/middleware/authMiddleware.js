const jwt = require("jsonwebtoken")
const User = require("../models/User")

const protect = async (req, res, next) => {

  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    try {

      token = req.headers.authorization.split(" ")[1]

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      )

      // ADMIN TOKEN

      if (decoded.role === "ADMIN") {

        req.user = {
          _id: "admin-id",
          name: "Admin",
          email: "admin@taskflow.com",
          role: "ADMIN",
        }

        return next()
      }

      // MEMBER TOKEN

      req.user = await User.findById(
        decoded.id
      ).select("-password")

      next()

    } catch (error) {

      return res.status(401).json({
        message: "Invalid token",
      })

    }
  }

  if (!token) {

    return res.status(401).json({
      message: "No token",
    })

  }
}

module.exports = protect