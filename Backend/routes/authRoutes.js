import express from "express";
import {
	register,
	login,
	getProfile,
	updateProfile,
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById,
} from "../controllers/authController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

router.get("/users", protect, restrictTo("admin"), getAllUsers);
router.get("/users/:userId", protect, restrictTo("admin"), getUserById);
router.put("/users/:userId", protect, restrictTo("admin"), updateUserById);
router.delete("/users/:userId", protect, restrictTo("admin"), deleteUserById);

export default router;
