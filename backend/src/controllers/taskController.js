const Task = require("../models/Task")

exports.createTask = async (req, res) => {
  try {

    const task = await Task.create(req.body)

    res.status(201).json(task)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }
}

exports.getTasks = async (req, res) => {
  try {

    let tasks

    if (req.user.role === "ADMIN") {

      tasks = await Task.find()
        .populate("assignedTo", "name email")
        .populate("project", "title")

    } else {

      tasks = await Task.find({
        assignedTo: req.user._id,
      })
        .populate("assignedTo", "name email")
        .populate("project", "title")

    }

    res.json(tasks)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }
}

exports.updateTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      })
    }

    if (
      req.user.role === "MEMBER" &&
      task.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized",
      })
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )

    res.json(updatedTask)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }
}

exports.deleteTask = async (req, res) => {
  try {

    await Task.findByIdAndDelete(req.params.id)

    res.json({
      message: "Task deleted",
    })

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }
}