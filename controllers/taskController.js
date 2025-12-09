const Project = require("../models/Project");
const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (project.user.toString() === req.user._id) {
      const task = await Task.create({ ...req.body, project: projectId });
      res.status(201).json(task);
    } else {
      res.status(400).json({ error: "You have no access to this project" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not Found!" });
    }
    if (project.user.toString() === req.user._id) {
      const tasks = await Task.find({ project: projectId });
      res.status(200).json(tasks);
    } else {
      res.status(400).json({ error: "You have no access to this project" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not Found!" });
    }
    const project = await Project.findById(task.project);
    if (!project) {
      return res.status(404).json({ error: "Task does not Belong to any project!" });
    }
    console.log(project.user.toString())
    console.log(req.user._id)
    if (project.user.toString() === req.user._id) {
      const newTask = await Task.findByIdAndUpdate(taskId, req.body, {new: true, runValidators: true});
      res.status(200).json(newTask);
    } else {
      res.status(400).json({ error: "You have no access to this task" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const {taskId} = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not Found!" });
    }
    const project = await Project.findById(task.project);
    if (!project) {
      return res.status(404).json({ error: "Task does not Belong to any project!" });
    }
    if (project.user.toString() === req.user._id) {
      const deletedTask = await Task.findByIdAndDelete(taskId);
      res.status(200).json(deletedTask);
    } else {
      res.status(400).json({ error: "You have no access to this task" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createTask, getAllTasks, updateTask, deleteTask };
