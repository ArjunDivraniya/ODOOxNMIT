import express from "express";
import { getMessages, addMessage } from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:projectId", protect, getMessages);
router.post("/", protect, addMessage);

export default router;
