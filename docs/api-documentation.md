# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### 1. Sign Up
**POST** `/auth/signup`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "MEMBER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 2. Login
**POST** `/auth/login`

Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "MEMBER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 3. Get Profile
**GET** `/auth/profile`

Get current user profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile retrieved",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "MEMBER"
  }
}
```

---

## Project Endpoints

### 1. Create Project
**POST** `/projects`

Create a new project. Creator becomes admin.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Website Redesign",
  "description": "Redesign company website with modern UI"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "id": 1,
    "name": "Website Redesign",
    "description": "Redesign company website with modern UI",
    "creatorId": 1,
    "createdAt": "2026-05-07T10:00:00.000Z",
    "updatedAt": "2026-05-07T10:00:00.000Z",
    "creator": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "members": [
      {
        "id": 1,
        "userId": 1,
        "role": "ADMIN",
        "user": {
          "id": 1,
          "name": "John Doe",
          "email": "john@example.com"
        }
      }
    ]
  }
}
```

---

### 2. Get All Projects
**GET** `/projects`

Get all projects where user is creator or member.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Projects retrieved",
  "data": [
    {
      "id": 1,
      "name": "Website Redesign",
      "description": "Redesign company website",
      "creatorId": 1,
      "createdAt": "2026-05-07T10:00:00.000Z",
      "creator": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
      },
      "members": [...],
      "_count": {
        "tasks": 5
      }
    }
  ]
}
```

---

### 3. Get Project by ID
**GET** `/projects/:projectId`

Get detailed project information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Project retrieved",
  "data": {
    "id": 1,
    "name": "Website Redesign",
    "description": "Redesign company website",
    "creator": {...},
    "members": [...],
    "tasks": [...]
  }
}
```

---

### 4. Add Member to Project
**POST** `/projects/:projectId/members`

Add a member to project (Admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "email": "jane@example.com"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Member added successfully",
  "data": {
    "id": 2,
    "projectId": 1,
    "userId": 2,
    "role": "MEMBER",
    "user": {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com"
    }
  }
}
```

---

### 5. Remove Member from Project
**DELETE** `/projects/:projectId/members/:userId`

Remove a member from project (Admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Member removed successfully"
}
```

---

### 6. Delete Project
**DELETE** `/projects/:projectId`

Delete a project (Admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

## Task Endpoints

### 1. Create Task
**POST** `/tasks/projects/:projectId/tasks`

Create a new task in a project (Admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Design homepage mockup",
  "description": "Create high-fidelity mockup for homepage",
  "status": "TODO",
  "priority": "HIGH",
  "dueDate": "2026-05-15",
  "assignedTo": 2
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 1,
    "title": "Design homepage mockup",
    "description": "Create high-fidelity mockup for homepage",
    "status": "TODO",
    "priority": "HIGH",
    "dueDate": "2026-05-15T00:00:00.000Z",
    "projectId": 1,
    "assignedTo": 2,
    "createdAt": "2026-05-07T10:00:00.000Z",
    "assignedUser": {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com"
    },
    "project": {
      "id": 1,
      "name": "Website Redesign"
    }
  }
}
```

---

### 2. Get Project Tasks
**GET** `/tasks/projects/:projectId/tasks`

Get all tasks for a project (Members can access).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Tasks retrieved",
  "data": [
    {
      "id": 1,
      "title": "Design homepage mockup",
      "status": "TODO",
      "priority": "HIGH",
      "dueDate": "2026-05-15T00:00:00.000Z",
      "assignedUser": {...}
    }
  ]
}
```

---

### 3. Get My Tasks
**GET** `/tasks/my-tasks`

Get all tasks assigned to current user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Tasks retrieved",
  "data": [
    {
      "id": 1,
      "title": "Design homepage mockup",
      "status": "IN_PROGRESS",
      "priority": "HIGH",
      "dueDate": "2026-05-15T00:00:00.000Z",
      "project": {
        "id": 1,
        "name": "Website Redesign"
      }
    }
  ]
}
```

---

### 4. Update Task
**PUT** `/tasks/:taskId`

Update task details. Members can update their own tasks.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "IN_PROGRESS",
  "priority": "MEDIUM"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": 1,
    "title": "Design homepage mockup",
    "status": "IN_PROGRESS",
    "priority": "MEDIUM",
    ...
  }
}
```

---

### 5. Delete Task
**DELETE** `/tasks/:taskId`

Delete a task (Admin only).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## Dashboard Endpoints

### 1. Get Dashboard Stats
**GET** `/dashboard/stats`

Get dashboard statistics for user's projects.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Dashboard stats retrieved",
  "data": {
    "totalTasks": 15,
    "tasksByStatus": {
      "todo": 5,
      "inProgress": 7,
      "done": 3
    },
    "overdueTasks": {
      "count": 2,
      "tasks": [
        {
          "id": 1,
          "title": "Design homepage mockup",
          "dueDate": "2026-05-01T00:00:00.000Z",
          "assignedUser": {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane@example.com"
          }
        }
      ]
    },
    "tasksByUser": {
      "Jane Smith": 8,
      "John Doe": 7
    }
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "No token provided"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Admin access required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Data Models

### User
```typescript
{
  id: number
  name: string
  email: string
  password: string (hashed)
  role: "ADMIN" | "MEMBER"
  createdAt: Date
  updatedAt: Date
}
```

### Project
```typescript
{
  id: number
  name: string
  description: string | null
  creatorId: number
  createdAt: Date
  updatedAt: Date
}
```

### Task
```typescript
{
  id: number
  title: string
  description: string | null
  status: "TODO" | "IN_PROGRESS" | "DONE"
  priority: "LOW" | "MEDIUM" | "HIGH"
  dueDate: Date | null
  projectId: number
  assignedTo: number | null
  createdAt: Date
  updatedAt: Date
}
```

### ProjectMember
```typescript
{
  id: number
  projectId: number
  userId: number
  role: "ADMIN" | "MEMBER"
  joinedAt: Date
}
```

---

## Testing with cURL

### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"My Project","description":"Project description"}'
```

### Get Dashboard Stats
```bash
curl -X GET http://localhost:5000/api/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting for production:
- 100 requests per 15 minutes per IP
- 1000 requests per hour per authenticated user

## CORS

CORS is enabled for all origins in development. Configure for production:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```
