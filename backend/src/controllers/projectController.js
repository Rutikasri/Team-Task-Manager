const Project = require("../models/Project")

exports.createProject = async (req, res) => {
  try {

    const {
      title,
      description,
      teamMembers,
    } = req.body

    const project = await Project.create({
      title,
      description,
      teamMembers,

      createdBy:
        req.user.role === "ADMIN"
          ? null
          : req.user._id,
    })

    res.status(201).json(project)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: error.message,
    })

  }
}

exports.getProjects = async (req, res) => {
  try {

    let projects

    if (req.user.role === "ADMIN") {

      projects = await Project.find()
        .populate("createdBy", "name email")
        .populate("teamMembers", "name email")

    } else {

      projects = await Project.find({
        teamMembers: req.user._id,
      })
        .populate("createdBy", "name email")
        .populate("teamMembers", "name email")

    }

    res.json(projects)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }
}

exports.updateProject = async (req, res) => {
  try {

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )

    res.json(project)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }
}

exports.deleteProject = async (req, res) => {
  try {

    await Project.findByIdAndDelete(req.params.id)

    res.json({
      message: "Project deleted",
    })

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }
}