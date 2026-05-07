# Team Task Manager - Complete Setup Guide

## Quick Start

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Database Setup

Make sure MySQL is running on your system. Then create the database:

```sql
CREATE DATABASE taskmanager;
```

Update the `backend/.env` file with your MySQL credentials:
```
DATABASE_URL="mysql://root:your_password@localhost:3306/taskmanager"
```

### 3. Run Database Migrations

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Start the Application

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```
Server will run on http://localhost:5000

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```
App will run on http://localhost:3000

### 5. Test the Application

1. Open http://localhost:3000
2. Click "Sign Up" to create a new account
3. Login with your credentials
4. Create a project
5. Add tasks to your project
6. View dashboard analytics

## Default User Roles

- First user to create a project becomes the **Admin**
- Admin can add members to projects
- Members can view and update their assigned tasks

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Check DATABASE_URL in backend/.env
- Verify database exists: `SHOW DATABASES;`

### Port Already in Use
- Backend: Change PORT in backend/.env
- Frontend: Change port in frontend/vite.config.js

### Prisma Issues
```bash
cd backend
npx prisma generate
npx prisma migrate reset
```

## Development Commands

### Backend
- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma migrate dev` - Create new migration

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Features

### Authentication
- Signup with name, email, password
- Login with JWT token
- Protected routes
- Auto logout on token expiration

### Projects
- Create projects (creator becomes admin)
- Add/remove team members
- View project details
- Delete projects (admin only)

### Tasks
- Create tasks with title, description, priority, due date
- Assign tasks to team members
- Update task status (TODO, IN_PROGRESS, DONE)
- View all assigned tasks
- Filter tasks by status

### Dashboard
- Total tasks count
- Tasks by status breakdown
- Overdue tasks list
- Tasks per user distribution

## API Endpoints

### Auth
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/auth/profile

### Projects
- POST /api/projects
- GET /api/projects
- GET /api/projects/:id
- POST /api/projects/:id/members
- DELETE /api/projects/:id/members/:userId
- DELETE /api/projects/:id

### Tasks
- POST /api/tasks/projects/:projectId/tasks
- GET /api/tasks/projects/:projectId/tasks
- GET /api/tasks/my-tasks
- PUT /api/tasks/:taskId
- DELETE /api/tasks/:taskId

### Dashboard
- GET /api/dashboard/stats

## Tech Stack Details

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router DOM** - Routing
- **Axios** - HTTP client

### Backend
- **Express.js** - Web framework
- **Prisma** - ORM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

### Database
- **MySQL** - Relational database
- **Prisma Schema** - Database modeling

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Role-based access control
- Input validation
- SQL injection prevention (Prisma)

## Next Steps

1. Customize the UI theme in `frontend/tailwind.config.js`
2. Add email notifications for task assignments
3. Implement real-time updates with WebSockets
4. Add file attachments to tasks
5. Create task comments feature
6. Add project templates
7. Implement task dependencies
8. Add time tracking
9. Create reports and exports
10. Deploy to production (Railway, Vercel, etc.)

## Support

For issues or questions, please check:
- Backend logs in terminal
- Browser console for frontend errors
- Prisma Studio for database inspection
- Network tab for API request/response

Happy coding! 🚀
