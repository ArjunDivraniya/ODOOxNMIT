import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import { protect, restrictTo } from "./middleware/authMiddleware.js";
import {
  getAdminDashboardStats,
  getUserDashboardStats,
  getReportsData,
} from "./controllers/dashboardController.js";
import cors from "cors";

const app = express();

const normalizeOrigin = (origin) => origin.replace(/\/+$/, "");

const allowedOrigins = (process.env.FRONTEND_URLS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean)
  .map(normalizeOrigin);

const defaultOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://arjundivraniya.in",
  "https://odo-ox-nmit-4jm1.vercel.app",
];

const resolvedOrigins = (allowedOrigins.length > 0 ? allowedOrigins : defaultOrigins).map(normalizeOrigin);

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  return resolvedOrigins.includes(normalizeOrigin(origin));
};

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

connectDB();

const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);

// Protected analytics routes
app.get("/api/admin/dashboard", protect, restrictTo("admin"), getAdminDashboardStats);
app.get("/api/user/dashboard", protect, getUserDashboardStats);
app.get("/api/reports", protect, restrictTo("admin"), getReportsData);

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join project room
  socket.on("join_project", (projectId) => {
    socket.join(projectId);
    console.log(`User ${socket.id} joined project ${projectId}`);
  });

  // Leave project room
  socket.on("leave_project", (projectId) => {
    socket.leave(projectId);
    console.log(`User ${socket.id} left project ${projectId}`);
  });

  // Handle new message
  socket.on("send_message", (data) => {
    io.to(data.projectId).emit("receive_message", data);
  });

  // Handle task updates
  socket.on("task_updated", (data) => {
    io.to(data.projectId).emit("task_update", data);
  });

  // Handle project updates
  socket.on("project_updated", (data) => {
    io.to(data.projectId).emit("project_update", data);
  });

  // Handle notification
  socket.on("send_notification", (data) => {
    io.to(data.userId).emit("receive_notification", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { io };
