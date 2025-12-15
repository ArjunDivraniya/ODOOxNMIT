# API Testing Guide - SynergySphere Backend

## Test the Backend API with these examples:

### 1. Register a New User (Admin)
```bash
POST http://localhost:5001/api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

### 2. Register a New User (Regular User)
```bash
POST http://localhost:5001/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### 3. Login
```bash
POST http://localhost:5001/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response:** You'll get a token. Copy it for the next requests!

### 4. Create a Project (Admin Only)
```bash
POST http://localhost:5001/api/projects
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "name": "New Website Project",
  "description": "Building a new company website",
  "startDate": "2024-01-01",
  "endDate": "2024-06-30",
  "teamMemberEmails": ["john@example.com"]
}
```

### 5. Get All Projects
```bash
GET http://localhost:5001/api/projects
Authorization: Bearer YOUR_TOKEN_HERE
```

### 6. Join Project with Passkey
```bash
POST http://localhost:5001/api/projects/join
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "passkey": "PROJECT_PASSKEY_FROM_CREATE_RESPONSE"
}
```

### 7. Create a Task
```bash
POST http://localhost:5001/api/tasks
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "title": "Design Homepage",
  "description": "Create the homepage design mockup",
  "status": "todo",
  "priority": "high",
  "project": "PROJECT_ID_HERE",
  "dueDate": "2024-02-15",
  "tags": ["design", "ui"]
}
```

### 8. Get Tasks for a Project
```bash
GET http://localhost:5001/api/tasks/project/PROJECT_ID_HERE
Authorization: Bearer YOUR_TOKEN_HERE
```

### 9. Update Task Status (Move in Kanban)
```bash
PUT http://localhost:5001/api/tasks/TASK_ID_HERE
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "status": "in-progress"
}
```

### 10. Get My Tasks
```bash
GET http://localhost:5001/api/tasks/my-tasks
Authorization: Bearer YOUR_TOKEN_HERE
```

### 11. Send a Message
```bash
POST http://localhost:5001/api/messages
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "projectId": "PROJECT_ID_HERE",
  "userId": "USER_ID_HERE",
  "user": {
    "id": "USER_ID_HERE",
    "name": "John Doe",
    "avatar": "/avatar.jpg"
  },
  "message": "Hello team! Let's get started."
}
```

### 12. Get Messages for Project
```bash
GET http://localhost:5001/api/messages/PROJECT_ID_HERE
Authorization: Bearer YOUR_TOKEN_HERE
```

### 13. Get Notifications
```bash
GET http://localhost:5001/api/notifications
Authorization: Bearer YOUR_TOKEN_HERE
```

### 14. Mark All Notifications as Read
```bash
PUT http://localhost:5001/api/notifications/mark-all-read
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## Using Postman or Thunder Client:

1. **Install Extension:**
   - VS Code: Install "Thunder Client" or "REST Client"
   - Or use Postman desktop app

2. **Set Base URL:** http://localhost:5001

3. **Add Authorization Header:**
   - Key: `Authorization`
   - Value: `Bearer YOUR_TOKEN_FROM_LOGIN`

4. **Test Each Endpoint** following the order above

---

## Testing WebSocket Connection:

Use this HTML file to test WebSocket:

```html
<!DOCTYPE html>
<html>
<head>
    <title>WebSocket Test</title>
    <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
</head>
<body>
    <h1>WebSocket Test</h1>
    <div id="messages"></div>
    
    <script>
        const socket = io('http://localhost:5001');
        
        socket.on('connect', () => {
            console.log('Connected!');
            
            // Join a project room
            socket.emit('join_project', 'PROJECT_ID_HERE');
            
            // Send a test message
            socket.emit('send_message', {
                projectId: 'PROJECT_ID_HERE',
                message: 'Hello from WebSocket!'
            });
        });
        
        socket.on('receive_message', (data) => {
            console.log('Message received:', data);
            document.getElementById('messages').innerHTML += 
                '<p>' + JSON.stringify(data) + '</p>';
        });
    </script>
</body>
</html>
```

---

## Expected Flow:

1. ✅ Register admin user
2. ✅ Register regular user
3. ✅ Login as admin → Get token
4. ✅ Create project → Get project ID and passkey
5. ✅ Login as regular user → Get token
6. ✅ Join project using passkey
7. ✅ Create tasks in the project
8. ✅ Update task status
9. ✅ Send messages in project chat
10. ✅ Check notifications

---

## Success Indicators:

- ✅ Server starts without errors
- ✅ MongoDB connection successful
- ✅ All API endpoints return proper responses
- ✅ JWT tokens work for protected routes
- ✅ WebSocket connection established
- ✅ Real-time updates work

---

**Backend is ready for production!** 🎉
