import express from "express";
import {
  createProject,
  searchUserByEmail,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  joinProjectWithPasskey,
  removeTeamMember,
} from "../controllers/projectController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all projects for logged-in user
router.get("/", protect, getAllProjects);

// Get project by ID
router.get("/:projectId", protect, getProjectById);

// Create new project (only admin can create)
router.post("/", protect, restrictTo("admin"), createProject);

// Join project with passkey
router.post("/join", protect, joinProjectWithPasskey);

// Update project
router.put("/:projectId", protect, updateProject);

// Delete project
router.delete("/:projectId", protect, deleteProject);

// Remove team member from project
router.delete("/:projectId/members/:userId", protect, removeTeamMember);

// Search user by email (admin can search team members)
router.get("/search", protect, restrictTo("admin"), searchUserByEmail);

export default router;
