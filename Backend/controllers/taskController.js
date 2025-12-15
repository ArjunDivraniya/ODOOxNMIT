import Task from "../models/Task.js";
import Project from "../models/Project.js";

// Get all tasks for a project
export const getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Verify project exists and user has access
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const tasks = await Task.find({ project: projectId })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all tasks assigned to the logged-in user
export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id })
      .populate("project", "name")
      .populate("createdBy", "name email")
      .sort({ dueDate: 1 });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, assignedTo, project, dueDate, tags } = req.body;

    if (!title || !project) {
      return res.status(400).json({ message: "Title and project are required" });
    }

    // Verify project exists
    const projectExists = await Project.findById(project);
    if (!projectExists) {
      return res.status(404).json({ message: "Project not found" });
    }

    const task = new Task({
      title,
      description,
      status: status || "todo",
      priority: priority || "medium",
      assignedTo: assignedTo || null,
      project,
      dueDate,
      tags: tags || [],
      createdBy: req.user._id,
    });

    await task.save();
    await task.populate("assignedTo", "name email");
    await task.populate("createdBy", "name email");

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;

    // If status is being updated to "done", set completedAt
    if (updates.status === "done") {
      updates.completedAt = new Date();
    } else if (updates.status && updates.status !== "done") {
      updates.completedAt = null;
    }

    const task = await Task.findByIdAndUpdate(taskId, updates, {
      new: true,
      runValidators: true,
    })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Task updated successfully",
      task,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get task by ID
export const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .populate("project", "name");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
