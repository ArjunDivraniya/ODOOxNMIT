import express from "express";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all notifications for logged-in user
router.get("/", protect, getNotifications);

// Get unread notification count
router.get("/unread-count", protect, getUnreadCount);

// Mark all notifications as read
router.put("/mark-all-read", protect, markAllAsRead);

// Mark a notification as read
router.put("/:notificationId/read", protect, markAsRead);

// Delete a notification
router.delete("/:notificationId", protect, deleteNotification);

export default router;
