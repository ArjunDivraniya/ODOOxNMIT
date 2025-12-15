# SynergySphere Backend API

Complete backend implementation for SynergySphere project management platform with real-time features, authentication, and MongoDB integration.

## 🚀 Features

✅ **User Authentication**
- Register/Login with JWT tokens
- Role-based access control (Admin/User)
- Password hashing with bcryptjs

✅ **Project Management**
- Create, read, update, delete projects
- Project passkey system for team joining
- Team member management
- Admin-only project creation

✅ **Task Management (Kanban Board)**
- Full CRUD operations for tasks
- Task status tracking (todo, in-progress, in-review, done)
- Priority levels (low, medium, high, urgent)
- Task assignment to team members
- Due date management

✅ **Real-time Chat**
- Project-based messaging
- WebSocket integration with Socket.io
- Message history and replies

✅ **Notifications System**
- Project invites
- Task assignments
- Project updates
- Message mentions
- Deadline reminders

✅ **WebSocket Support**
- Real-time project updates
- Live task updates
- Instant messaging
- Push notifications

## 📁 Project Structure

```
Backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js       # Authentication logic
│   ├── projectController.js    # Project CRUD operations
│   ├── taskController.js       # Task management
│   ├── messageController.js    # Chat functionality
│   └── notificationController.js # Notification system
├── middleware/
│   └── authMiddleware.js       # JWT verification & authorization
├── models/
│   ├── User.js            # User schema
│   ├── Project.js         # Project schema
│   ├── Task.js            # Task schema
│   ├── Message.js         # Message schema
│   └── Notification.js    # Notification schema
├── routes/
│   ├── authRoutes.js      # Auth endpoints
│   ├── projectRoutes.js   # Project endpoints
│   ├── taskRoutes.js      # Task endpoints
│   ├── messageRoutes.js   # Message endpoints
│   └── notificationRoutes.js # Notification endpoints
├── .env                   # Environment variables
├── server.js              # Main server file
└── package.json           # Dependencies
```

## 🛠️ Installation

1. **Install Dependencies**
```bash
cd Backend
npm install
```

2. **Configure Environment Variables**
Create or update `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=5001
```

3. **Start Server**
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)

### Projects
- `GET /api/projects` - Get all projects (Protected)
- `GET /api/projects/:projectId` - Get project by ID (Protected)
- `POST /api/projects` - Create project (Admin only)
- `PUT /api/projects/:projectId` - Update project (Protected)
- `DELETE /api/projects/:projectId` - Delete project (Protected)
- `POST /api/projects/join` - Join project with passkey (Protected)
- `DELETE /api/projects/:projectId/members/:userId` - Remove team member (Protected)
- `GET /api/projects/search?email=user@example.com` - Search user by email (Admin only)

### Tasks
- `GET /api/tasks/my-tasks` - Get all tasks for logged-in user (Protected)
- `GET /api/tasks/project/:projectId` - Get all tasks for a project (Protected)
- `GET /api/tasks/:taskId` - Get task by ID (Protected)
- `POST /api/tasks` - Create new task (Protected)
- `PUT /api/tasks/:taskId` - Update task (Protected)
- `DELETE /api/tasks/:taskId` - Delete task (Protected)

### Messages
- `GET /api/messages/:projectId` - Get all messages for a project (Protected)
- `POST /api/messages` - Send new message (Protected)

### Notifications
- `GET /api/notifications` - Get all notifications (Protected)
- `GET /api/notifications/unread-count` - Get unread count (Protected)
- `PUT /api/notifications/mark-all-read` - Mark all as read (Protected)
- `PUT /api/notifications/:notificationId/read` - Mark notification as read (Protected)
- `DELETE /api/notifications/:notificationId` - Delete notification (Protected)

## 🔌 WebSocket Events

### Client -> Server
- `join_project` - Join project room
- `leave_project` - Leave project room
- `send_message` - Send chat message
- `task_updated` - Task update notification
- `project_updated` - Project update notification
- `send_notification` - Send notification

### Server -> Client
- `receive_message` - Receive chat message
- `task_update` - Receive task update
- `project_update` - Receive project update
- `receive_notification` - Receive notification

## 🔐 Authentication

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 👥 User Roles

- **Admin**: Can create projects, manage all projects, full access
- **User**: Can join projects via passkey, manage assigned tasks, view team projects

## 📦 Dependencies

```json
{
  "express": "^5.1.0",
  "mongoose": "^8.18.0",
  "bcryptjs": "^3.0.2",
  "jsonwebtoken": "^9.0.2",
  "cors": "^2.8.5",
  "dotenv": "^17.2.2",
  "socket.io": "^4.8.1"
}
```

## 🗄️ Database Models

### User
- name, email, password, role

### Project
- name, description, startDate, endDate, teamMembers, passkey, createdBy

### Task
- title, description, status, priority, assignedTo, project, dueDate, tags, createdBy

### Message
- projectId, userId, user (name, avatar), message, timestamp, replyTo

### Notification
- recipient, sender, type, title, message, link, project, task, isRead

## 🌐 CORS Configuration

Frontend URLs allowed:
- http://localhost:3000
- http://localhost:5173

## 💾 MongoDB Connection

The app uses MongoDB Atlas with connection pooling and automatic reconnection.

## 🚨 Error Handling

All endpoints include proper error handling with appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## 📝 Notes

- JWT tokens expire after 7 days
- Passwords are hashed using bcryptjs with salt rounds of 10
- WebSocket connection is established on server port with CORS enabled
- All dates are stored in ISO format
- Task completion automatically sets `completedAt` timestamp

## 🔧 Development Tips

1. Use `npm run dev` for auto-restart on file changes
2. Check MongoDB connection in logs on startup
3. Test WebSocket events using Socket.io client
4. Use Postman/Insomnia for API testing

## ✅ Status

**Backend is complete and production-ready!**

All models, controllers, routes, middleware, and real-time features are implemented with:
- ✅ Full authentication system
- ✅ Complete CRUD operations
- ✅ Role-based access control
- ✅ WebSocket integration
- ✅ MongoDB integration
- ✅ Error handling
- ✅ Security measures
