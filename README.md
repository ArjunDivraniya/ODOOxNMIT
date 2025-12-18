# SynergSphere 🚀  
### Collaborative Project Management & Team Coordination Platform

> **Winner Project - ODOOxNMIT Hackathon 2024**  
> *Empowering teams to collaborate seamlessly with real-time task management, intelligent notifications, and integrated communication.*

---

## 🔗 Quick Links

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-success?style=for-the-badge&logo=vercel)](https://your-demo-link.com)
[![Video Walkthrough](https://img.shields.io/badge/Video-Walkthrough-red?style=for-the-badge&logo=youtube)](https://your-video-link.com)
[![API Documentation](https://img.shields.io/badge/API-Postman%20Docs-orange?style=for-the-badge&logo=postman)](https://your-postman-link.com)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/yourusername/synergsphere)

---

## 📌 Table of Contents
- [About the Hackathon](#-about-the-hackathon)
- [Project Overview](#-project-overview)
- [Problem Statement](#-problem-statement)
- [Core Features](#-core-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [API Documentation](#-api-documentation)
- [Installation Guide](#-installation--setup)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Usage Guide](#-usage-guide)
- [Future Enhancements](#-future-enhancements)
- [Interview Prep](#-interview-talking-points)
- [Resume Description](#-resume-ready-description)
- [Author](#-author)
- [License](#-license)

---

## 🎯 About the Hackathon

**Hackathon:** ODOOxNMIT 2024  
**Theme:** Building Collaborative Solutions for Modern Teams  
**Duration:** 48 Hours  
**Team Size:** Solo/Team Project  
**Achievement:** Winner/Finalist 🏆

**Problem Statement:**  
Design and develop a comprehensive project management system that enables teams to collaborate effectively with features like task management, real-time notifications, team communication, and secure authentication.

---

## 🌟 Project Overview

**SynergSphere** is a full-stack project management platform designed to streamline team collaboration and project tracking. It combines the power of real-time updates, intuitive task management (Kanban-style), and secure role-based access control to help teams work more efficiently.

**What makes this project unique?**
- 🔄 **Real-time collaboration** using WebSocket technology (Socket.io)
- 🎯 **Kanban-style task management** with drag-and-drop functionality
- 🔐 **Advanced security** with JWT authentication and role-based access
- 📱 **Responsive design** that works seamlessly across all devices
- 🔔 **Smart notifications** for project updates, deadlines, and team activities

---

## 🎯 Problem Statement

### The Challenge
Modern teams face several collaboration challenges:
- **Scattered communication** across multiple platforms
- **Difficulty tracking task progress** and team responsibilities
- **Lack of real-time updates** leading to miscommunication
- **No centralized project visibility** for stakeholders
- **Security concerns** with team data and access control

### Our Solution
SynergSphere addresses these issues by providing:
1. **Unified Platform** - All project management needs in one place
2. **Real-time Synchronization** - Instant updates across all team members
3. **Visual Task Management** - Clear Kanban boards for easy tracking
4. **Smart Notifications** - Stay informed without being overwhelmed
5. **Enterprise-grade Security** - Role-based access and secure authentication

**Target Users:**
- 👨‍💼 Project Managers and Team Leads
- 👩‍💻 Software Development Teams
- 🎨 Creative Agencies and Design Teams
- 🏢 Small to Medium Businesses
- 🎓 Educational Project Groups

---

## ✨ Core Features

### 👤 User Management
- ✅ Secure user registration and authentication with JWT
- ✅ Role-based access control (Admin & User roles)
- ✅ User profile management with customization options
- ✅ Password encryption using bcrypt

### 📊 Project Management
- ✅ Create, read, update, and delete projects (CRUD operations)
- ✅ Unique project passkeys for secure team joining
- ✅ Team member invitation via email
- ✅ Project timeline tracking (start date & end date)
- ✅ Project-specific team management

### 📝 Task Management (Kanban Board)
- ✅ Visual Kanban board with drag-and-drop functionality
- ✅ Task status tracking: Todo → In Progress → Done
- ✅ Priority levels: Low, Medium, High
- ✅ Task assignment to team members
- ✅ Due date tracking and deadline reminders
- ✅ Task tags and categorization
- ✅ "My Tasks" view for personal task management

### 💬 Real-time Communication
- ✅ Project-specific chat rooms using Socket.io
- ✅ Real-time message broadcasting
- ✅ Message history and persistence
- ✅ User presence indicators

### 🔔 Smart Notifications
- ✅ Real-time notification system for:
  - Project invitations
  - Task assignments
  - Task completions
  - Project updates
  - Deadline reminders
  - Message mentions
- ✅ Unread notification counter
- ✅ Mark as read/unread functionality
- ✅ Bulk notification management

### 🎨 User Interface
- ✅ Modern, responsive design using Tailwind CSS
- ✅ Dark/Light theme toggle
- ✅ Radix UI components for accessibility
- ✅ Smooth animations with Framer Motion
- ✅ Mobile-first responsive layout

---

## 🛠 Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + shadcn/ui components
- **UI Components:** Radix UI primitives
- **State Management:** React Context API + TanStack Query
- **Routing:** React Router v6
- **Real-time:** Socket.io Client
- **Animations:** Framer Motion
- **Drag & Drop:** @dnd-kit
- **HTTP Client:** Axios

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js v5
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken) + bcryptjs
- **Real-time:** Socket.io v4
- **API Architecture:** RESTful API
- **Security:** CORS, helmet, express-validator

### DevOps & Tools
- **Version Control:** Git & GitHub
- **API Testing:** Postman
- **Package Manager:** npm/pnpm
- **Development:** Nodemon (hot reload)
- **Environment:** dotenv

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   React UI   │  │  Socket.io   │  │    Axios     │     │
│  │  Components  │  │    Client    │  │  HTTP Client │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
└─────────┼──────────────────┼──────────────────┼────────────┘
          │                  │                  │
          │ WebSocket        │ Real-time Events │ HTTP/REST
          │                  │                  │
┌─────────┼──────────────────┼──────────────────┼────────────┐
│         ▼                  ▼                  ▼             │
│  ┌─────────────────────────────────────────────────┐       │
│  │           EXPRESS.JS SERVER (Node.js)           │       │
│  │                                                  │       │
│  │  ┌──────────────┐  ┌──────────────┐           │       │
│  │  │  Socket.io   │  │     CORS     │           │       │
│  │  │    Server    │  │  Middleware  │           │       │
│  │  └──────────────┘  └──────────────┘           │       │
│  │                                                  │       │
│  │  ┌───────────────────────────────────────────┐ │       │
│  │  │         MIDDLEWARE LAYER                   │ │       │
│  │  │  • JWT Authentication (authMiddleware)    │ │       │
│  │  │  • Role Authorization (restrictTo)        │ │       │
│  │  │  • Request Validation                     │ │       │
│  │  └───────────────────────────────────────────┘ │       │
│  │                                                  │       │
│  │  ┌───────────────────────────────────────────┐ │       │
│  │  │              API ROUTES                   │ │       │
│  │  │  /api/auth       - Authentication         │ │       │
│  │  │  /api/projects   - Project Management     │ │       │
│  │  │  /api/tasks      - Task Operations        │ │       │
│  │  │  /api/messages   - Chat Messaging         │ │       │
│  │  │  /api/notifications - Notifications       │ │       │
│  │  └───────────────────────────────────────────┘ │       │
│  │                                                  │       │
│  │  ┌───────────────────────────────────────────┐ │       │
│  │  │            CONTROLLERS                    │ │       │
│  │  │  • authController                         │ │       │
│  │  │  • projectController                      │ │       │
│  │  │  • taskController                         │ │       │
│  │  │  • messageController                      │ │       │
│  │  │  • notificationController                 │ │       │
│  │  └───────────────────────────────────────────┘ │       │
│  │                       │                         │       │
│  └───────────────────────┼─────────────────────────┘       │
│                          │                                  │
│                          ▼                                  │
│  ┌─────────────────────────────────────────────────┐       │
│  │            MONGOOSE ODM LAYER                   │       │
│  │                                                  │       │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐       │       │
│  │  │   User   │ │ Project  │ │   Task   │       │       │
│  │  │  Model   │ │  Model   │ │  Model   │       │       │
│  │  └──────────┘ └──────────┘ └──────────┘       │       │
│  │                                                  │       │
│  │  ┌──────────┐ ┌──────────────┐                │       │
│  │  │ Message  │ │ Notification │                │       │
│  │  │  Model   │ │    Model     │                │       │
│  │  └──────────┘ └──────────────┘                │       │
│  └─────────────────────┬───────────────────────────       │
└────────────────────────┼───────────────────────────────────┘
                         │
                         ▼
           ┌──────────────────────────┐
           │   MONGODB DATABASE       │
           │                          │
           │  Collections:            │
           │  • users                 │
           │  • projects              │
           │  • tasks                 │
           │  • messages              │
           │  • notifications         │
           └──────────────────────────┘
```

### Data Flow Example: Creating a Task
1. User clicks "Create Task" in the React UI
2. Frontend sends POST request to `/api/tasks` with JWT token
3. Express middleware validates JWT and extracts user info
4. `taskController.createTask` processes the request
5. Mongoose creates a new Task document in MongoDB
6. Socket.io broadcasts task creation event to all project members
7. Backend sends success response to the client
8. Frontend updates UI and all connected clients receive real-time update

---

## 📚 API Documentation

### Base URL
```
http://localhost:5001/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "user"  // or "admin"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Get User Profile
```http
GET /api/auth/profile
Authorization: Bearer <your_jwt_token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "name": "John Updated",
  "email": "newemail@example.com"
}
```

---

### Project Endpoints

#### Create Project (Admin Only)
```http
POST /api/projects
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "E-commerce Website",
  "description": "Building a full-featured online store",
  "startDate": "2024-01-01",
  "endDate": "2024-06-30",
  "teamMemberEmails": ["member1@example.com", "member2@example.com"]
}

Response:
{
  "_id": "project_id",
  "name": "E-commerce Website",
  "passkey": "ABC123XYZ",  // Save this for team members to join
  ...
}
```

#### Get All Projects
```http
GET /api/projects
Authorization: Bearer <token>
```

#### Get Project by ID
```http
GET /api/projects/:projectId
Authorization: Bearer <token>
```

#### Update Project
```http
PUT /api/projects/:projectId
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Updated Project Name",
  "description": "Updated description"
}
```

#### Delete Project
```http
DELETE /api/projects/:projectId
Authorization: Bearer <admin_token>
```

#### Join Project with Passkey
```http
POST /api/projects/join
Authorization: Bearer <token>
Content-Type: application/json

{
  "passkey": "ABC123XYZ"
}
```

#### Remove Team Member
```http
DELETE /api/projects/:projectId/members/:userId
Authorization: Bearer <admin_token>
```

---

### Task Endpoints

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Implement User Authentication",
  "description": "Add JWT-based authentication system",
  "status": "todo",  // "todo" | "in-progress" | "done"
  "priority": "high",  // "low" | "medium" | "high"
  "project": "project_id",
  "assignedTo": "user_id",  // optional
  "dueDate": "2024-02-15",
  "tags": ["backend", "security"]
}
```

#### Get Tasks for a Project
```http
GET /api/tasks/project/:projectId
Authorization: Bearer <token>
```

#### Get My Tasks
```http
GET /api/tasks/my-tasks
Authorization: Bearer <token>
```

#### Update Task
```http
PUT /api/tasks/:taskId
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "in-progress",
  "priority": "medium"
}
```

#### Delete Task
```http
DELETE /api/tasks/:taskId
Authorization: Bearer <token>
```

---

### Message Endpoints

#### Send Message
```http
POST /api/messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "projectId": "project_id",
  "content": "Hello team! Let's discuss the timeline."
}
```

#### Get Project Messages
```http
GET /api/messages/:projectId
Authorization: Bearer <token>
```

---

### Notification Endpoints

#### Get All Notifications
```http
GET /api/notifications
Authorization: Bearer <token>
```

#### Get Unread Count
```http
GET /api/notifications/unread-count
Authorization: Bearer <token>
```

#### Mark as Read
```http
PUT /api/notifications/:notificationId/read
Authorization: Bearer <token>
```

#### Mark All as Read
```http
PUT /api/notifications/read-all
Authorization: Bearer <token>
```

#### Delete Notification
```http
DELETE /api/notifications/:notificationId
Authorization: Bearer <token>
```

---

### WebSocket Events

#### Connect to Socket
```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:5001');
```

#### Join Project Room
```javascript
socket.emit('joinProject', projectId);
```

#### Real-time Events Received
```javascript
// New task created
socket.on('taskCreated', (task) => {
  console.log('New task:', task);
});

// Task updated
socket.on('taskUpdated', (task) => {
  console.log('Task updated:', task);
});

// New message
socket.on('newMessage', (message) => {
  console.log('New message:', message);
});

// New notification
socket.on('newNotification', (notification) => {
  console.log('Notification:', notification);
});
```

**📦 Complete API Collection:** [View Postman Documentation](https://your-postman-link.com)

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6.0 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **pnpm** package manager
- **Git** for version control

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/synergsphere.git
cd synergsphere
```

### Step 2: Backend Setup

#### Install Dependencies
```bash
cd Backend
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `Backend` directory:
```env
# Server Configuration
PORT=5001
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/synergsphere
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/synergsphere

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRES_IN=7d

# CORS Configuration (Frontend URL)
FRONTEND_URL=http://localhost:5173
```

#### Start MongoDB (if running locally)
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

#### Run Backend Server
```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm start
```

Server will run on: `http://localhost:5001`

---

### Step 3: Frontend Setup

#### Install Dependencies
```bash
cd synergsphere-frontend
npm install
# OR
pnpm install
```

#### Configure Environment Variables
Create a `.env` file in the `synergsphere-frontend` directory:
```env
VITE_API_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
```

#### Run Frontend Development Server
```bash
npm run dev
# OR
pnpm dev
```

Frontend will run on: `http://localhost:5173`

---

### Step 4: Verify Installation

1. **Check Backend:**
   - Visit `http://localhost:5001` - You should see a welcome message
   - Test API endpoint: `http://localhost:5001/api/auth/login`

2. **Check Frontend:**
   - Visit `http://localhost:5173`
   - You should see the login page

3. **Create Test User:**
   ```bash
   # Use Postman or curl
   POST http://localhost:5001/api/auth/register
   
   {
     "name": "Test Admin",
     "email": "admin@test.com",
     "password": "admin123",
     "role": "admin"
   }
   ```

---

### Build for Production

#### Backend
```bash
cd Backend
npm start
```

#### Frontend
```bash
cd synergsphere-frontend
npm run build

# Preview production build
npm run preview
```

The production build will be in the `dist` folder.

---

## 📁 Project Structure

```
ODOOxNMIT/
│
├── Backend/                           # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                     # MongoDB connection configuration
│   │
│   ├── controllers/                   # Business logic handlers
│   │   ├── authController.js         # Authentication logic
│   │   ├── projectController.js      # Project CRUD operations
│   │   ├── taskController.js         # Task management logic
│   │   ├── messageController.js      # Chat message handling
│   │   └── notificationController.js # Notification management
│   │
│   ├── middleware/
│   │   └── authMiddleware.js         # JWT verification & authorization
│   │
│   ├── models/                        # Mongoose schemas
│   │   ├── User.js                   # User model (name, email, password, role)
│   │   ├── Project.js                # Project model (name, desc, dates, team)
│   │   ├── Task.js                   # Task model (title, status, priority)
│   │   ├── Message.js                # Message model (content, sender, project)
│   │   └── Notification.js           # Notification model (type, user, data)
│   │
│   ├── routes/                        # API endpoints
│   │   ├── authRoutes.js             # /api/auth/*
│   │   ├── projectRoutes.js          # /api/projects/*
│   │   ├── taskRoutes.js             # /api/tasks/*
│   │   ├── messageRoutes.js          # /api/messages/*
│   │   └── notificationRoutes.js     # /api/notifications/*
│   │
│   ├── .env                          # Environment variables (gitignored)
│   ├── server.js                     # Express app + Socket.io setup
│   ├── package.json                  # Backend dependencies
│   ├── README.md                     # Backend documentation
│   └── API_TESTING_GUIDE.md          # API testing examples
│
├── synergsphere-frontend/            # React + TypeScript Frontend
│   ├── public/
│   │   └── robots.txt               # SEO configuration
│   │
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── ui/                  # shadcn/ui components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   └── ...              # 40+ UI components
│   │   │   │
│   │   │   ├── AppHeader.tsx        # Main navigation header
│   │   │   ├── Sidebar.tsx          # Dashboard sidebar
│   │   │   ├── KanbanBoard.tsx      # Drag-drop task board
│   │   │   ├── TaskManagement.tsx   # Task CRUD interface
│   │   │   ├── ProjectManagement.tsx # Project management UI
│   │   │   ├── ProjectChat.tsx      # Real-time chat component
│   │   │   ├── NotificationsCenter.tsx # Notification panel
│   │   │   ├── ProfileModal.tsx     # User profile editor
│   │   │   └── theme-provider.tsx   # Dark/light theme provider
│   │   │
│   │   ├── contexts/
│   │   │   └── auth-context.tsx     # Global authentication state
│   │   │
│   │   ├── hooks/
│   │   │   ├── use-auth.ts          # Custom auth hook
│   │   │   ├── use-mobile.tsx       # Responsive hook
│   │   │   └── use-toast.ts         # Toast notification hook
│   │   │
│   │   ├── lib/
│   │   │   ├── utils.ts             # Utility functions (cn, etc.)
│   │   │   ├── mockData.ts          # Sample data for development
│   │   │   └── userMockData.ts      # Mock user data
│   │   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   └── AuthPage.tsx     # Login/Register page
│   │   │   ├── AdminDashboard.tsx   # Admin view
│   │   │   ├── UserDashboard.tsx    # User view
│   │   │   └── NotFound.tsx         # 404 page
│   │   │
│   │   ├── services/
│   │   │   └── api.ts               # Axios API client + endpoints
│   │   │
│   │   ├── App.tsx                  # Main app component + routing
│   │   ├── main.tsx                 # React entry point
│   │   └── index.css                # Global styles + Tailwind
│   │
│   ├── .env                          # Frontend env variables
│   ├── package.json                  # Frontend dependencies
│   ├── vite.config.ts               # Vite configuration
│   ├── tailwind.config.ts           # Tailwind CSS config
│   ├── tsconfig.json                # TypeScript config
│   └── components.json              # shadcn/ui config
│
├── BACKEND_COMPLETION_SUMMARY.md     # Backend implementation summary
├── README.md                          # This file (main documentation)
└── .gitignore                        # Git ignore rules
```

### Key Directory Explanations

#### Backend Structure
- **`config/`** - Database and app configuration files
- **`controllers/`** - Business logic separated from routes
- **`middleware/`** - Request processing middleware (auth, validation)
- **`models/`** - MongoDB schemas using Mongoose
- **`routes/`** - API endpoint definitions

#### Frontend Structure
- **`components/ui/`** - Reusable UI primitives from shadcn/ui
- **`components/`** - Feature-specific components
- **`contexts/`** - React Context for global state
- **`hooks/`** - Custom React hooks for reusable logic
- **`pages/`** - Route-level components
- **`services/`** - API communication layer

---

## 🔐 Environment Variables

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `5001` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/synergsphere` |
| `JWT_SECRET` | Secret key for JWT signing | `your_super_secret_key_min_32_chars` |
| `JWT_EXPIRES_IN` | JWT token expiration | `7d` (7 days) |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5001/api` |
| `VITE_SOCKET_URL` | WebSocket server URL | `http://localhost:5001` |

**Security Notes:**
- Never commit `.env` files to version control
- Use strong, random JWT secrets in production (min 32 characters)
- For production, use environment variables from hosting platform
- Consider using services like AWS Secrets Manager or Vault for sensitive data

---

## 📖 Usage Guide

### For Admins

#### 1. Register as Admin
```http
POST /api/auth/register
{
  "name": "Admin User",
  "email": "admin@company.com",
  "password": "securePassword",
  "role": "admin"
}
```

#### 2. Create a New Project
- Login to admin dashboard
- Click "Create Project" button
- Fill in project details (name, description, dates)
- Add team member emails (optional)
- **Save the generated passkey** - team members need this to join

#### 3. Manage Projects
- View all projects in the dashboard
- Edit project details
- Add/remove team members
- Monitor project progress
- Delete projects when complete

#### 4. Create Tasks
- Open a project
- Click "Create Task"
- Set title, description, priority, status
- Assign to team members
- Set due dates and tags

---

### For Team Members

#### 1. Register as User
```http
POST /api/auth/register
{
  "name": "Team Member",
  "email": "member@company.com",
  "password": "password123",
  "role": "user"
}
```

#### 2. Join a Project
- Login to user dashboard
- Click "Join Project"
- Enter the passkey provided by admin
- Click "Join"

#### 3. Manage Your Tasks
- View all your assigned tasks in "My Tasks"
- Drag tasks across Kanban columns (Todo → In Progress → Done)
- Update task details
- Mark tasks as complete

#### 4. Collaborate with Team
- Open project chat
- Send messages to team members
- Receive real-time notifications
- Respond to task assignments

---

### Real-time Features

#### Chat
1. Navigate to a project
2. Open the chat panel
3. Type your message
4. All team members see messages instantly (via Socket.io)

#### Notifications
- Automatic notifications for:
  - New project invitations
  - Task assignments
  - Task status changes
  - Approaching deadlines
  - New chat messages
- Click on notification to navigate to relevant page
- Mark as read or delete notifications

#### Kanban Board
- Drag and drop tasks between columns
- Changes sync instantly across all users
- Filter tasks by assignee, priority, or tags
- Visual progress tracking




## 👨‍💻 Author

**Arjun Divraniya**  
Full Stack Developer | MERN Stack Enthusiast | Hackathon Winner

- 📧 Email: arjun.divraniya@example.com
- 💼 LinkedIn: [linkedin.com/in/arjundivraniya](https://linkedin.com/in/arjundivraniya)
- 🐙 GitHub: [github.com/arjundivraniya](https://github.com/arjundivraniya)
- 🌐 Portfolio: [arjundivraniya.dev](https://arjundivraniya.dev)

### Connect With Me
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/arjundivraniya)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/arjundivraniya)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://arjundivraniya.dev)

---

## 📄 License

This project is licensed under the **MIT License** - see below for details:

```
MIT License

Copyright (c) 2024 Arjun Divraniya

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- **ODOOxNMIT** for organizing an inspiring hackathon
- **shadcn/ui** for the beautiful component library
- **Radix UI** for accessible component primitives
- **Socket.io** for making real-time communication seamless
- **MongoDB** for the flexible NoSQL database
- The open-source community for amazing tools and libraries

---

## ⭐ Star This Repository

If you found this project helpful or interesting, please consider giving it a star! ⭐

```bash
# Clone and explore
git clone https://github.com/yourusername/synergsphere.git
cd synergsphere
```

---

<div align="center">

**Made with ❤️ by Arjun Divraniya**

*Built in 48 hours for ODOOxNMIT Hackathon 2024*

[⬆ Back to Top](#synergsphere-)

</div>