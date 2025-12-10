const Project = require("../models/Project");
const Task = require("../models/Task");

const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProjectByID = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not Found!" });
    }
    if (req.user._id === project.user.toString()) {
      res.status(200).json(project);
    } else {
      res.status(403).json({ error: "This is not your project" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Product not found!" });
    }
    if (req.user._id === project.user.toString()) {
      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      res.status(200).json(updatedProject);
    } else {
      res.status(403).json({ error: "This is not your project" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Product not found!" });
    }
    if (req.user._id === project.user.toString()) {
       const tasks = await Task.find({ project: req.params.id });
       for (let task of tasks) {
          await Task.findByIdAndDelete(task._id);
       }
      const deletedProject = await Project.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedProject);
    } else {
      res.status(403).json({ error: "This is not your project" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectByID,
  updateProject,
  deleteProject,
};
