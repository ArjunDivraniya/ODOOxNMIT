import express from "express";
import {
  getProjectTasks,
  getMyTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all tasks for logged-in user
router.get("/my-tasks", protect, getMyTasks);

// Get all tasks for a specific project
router.get("/project/:projectId", protect, getProjectTasks);

// Get task by ID
router.get("/:taskId", protect, getTaskById);

// Create a new task
router.post("/", protect, createTask);

// Update a task
router.put("/:taskId", protect, updateTask);

// Delete a task
router.delete("/:taskId", protect, deleteTask);

export default router;
