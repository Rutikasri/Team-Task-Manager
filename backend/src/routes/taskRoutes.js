const express = require("express")

const router = express.Router()

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController")

const protect = require("../middleware/authMiddleware")

const roleMiddleware = require("../middleware/roleMiddleware")

router.post(
  "/",
  protect,
  roleMiddleware("ADMIN"),
  createTask
)

router.get(
  "/",
  protect,
  getTasks
)

router.put(
  "/:id",
  protect,
  updateTask
)

router.delete(
  "/:id",
  protect,
  roleMiddleware("ADMIN"),
  deleteTask
)

module.exports = router