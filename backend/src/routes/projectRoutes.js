const express = require("express")

const router = express.Router()

const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController")

const protect = require("../middleware/authMiddleware")

const roleMiddleware = require("../middleware/roleMiddleware")

router.post(
  "/",
  protect,
  roleMiddleware("ADMIN"),
  createProject
)

router.get(
  "/",
  protect,
  getProjects
)

router.put(
  "/:id",
  protect,
  roleMiddleware("ADMIN"),
  updateProject
)

router.delete(
  "/:id",
  protect,
  roleMiddleware("ADMIN"),
  deleteProject
)

module.exports = router