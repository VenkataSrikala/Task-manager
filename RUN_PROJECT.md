# 🚀 Running the Team Task Manager Project

## ✅ Setup Complete!

Your project is now configured with **SQLite** (no MySQL needed for testing).

---

## 🎯 Quick Start - 3 Simple Steps

### Step 1: Start Backend Server

Open a **new terminal/PowerShell** window and run:

```powershell
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📍 Health check: http://localhost:5000/health
```

**Keep this terminal open!**

---

### Step 2: Start Frontend Server

Open **another new terminal/PowerShell** window and run:

```powershell
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

**Keep this terminal open too!**

---

### Step 3: Open in Browser

Open your browser and go to:
```
http://localhost:3000
```

You should see the **Login page**!

---

## 🎉 First Time Usage

### 1. Create an Account
- Click "Sign Up"
- Enter your name, email, and password
- Click "Sign Up" button
- You'll be redirected to the Dashboard

### 2. Create a Project
- Click "Projects" in the navigation
- Click "Create Project" button
- Enter project name and description
- Click "Create"
- You're now the admin of this project!

### 3. Create a Task
- Click "My Tasks" in the navigation
- Click "Create Task" button
- Select your project
- Fill in task details
- Click "Create"
- Your task appears in the TODO column!

### 4. Update Task Status
- Drag tasks between columns or use the dropdown
- Change status: TODO → IN_PROGRESS → DONE
- Watch the dashboard update!

---

## 🔍 Testing the Application

### Test Authentication
- [x] Sign up with new account
- [x] Logout
- [x] Login with same account
- [x] Try accessing /dashboard without login (should redirect)

### Test Projects
- [x] Create a project
- [x] View project details
- [x] Create another user account
- [x] Add the second user as a member
- [x] Remove a member

### Test Tasks
- [x] Create tasks in your project
- [x] Update task status
- [x] Set different priorities
- [x] Add due dates
- [x] Check overdue tasks (set past date)

### Test Dashboard
- [x] View total tasks
- [x] See tasks by status
- [x] Check overdue tasks section
- [x] View tasks by user

---

## 🛠️ Troubleshooting

### Backend won't start
```powershell
# Check if port 5000 is in use
netstat -ano | findstr :5000

# If in use, kill the process or change port in backend/.env
```

### Frontend won't start
```powershell
# Check if port 3000 is in use
netstat -ano | findstr :3000

# If in use, Vite will automatically use port 3001
```

### "Cannot connect to backend"
- Make sure backend is running on port 5000
- Check backend terminal for errors
- Verify VITE_API_URL in frontend/.env

### Database errors
```powershell
# Reset database
cd backend
rm prisma/dev.db
npx prisma migrate dev --name init
```

---

## 📊 What's Running

### Backend (Port 5000)
- Express.js server
- REST API endpoints
- SQLite database (dev.db)
- JWT authentication

### Frontend (Port 3000)
- React application
- Vite dev server
- Hot module replacement
- Tailwind CSS

---

## 🎨 Features to Try

1. **Multi-user Collaboration**
   - Create 2 accounts
   - Add second user to project
   - Assign tasks to different users

2. **Task Management**
   - Create tasks with different priorities
   - Set due dates
   - Update statuses
   - Mark tasks as done

3. **Dashboard Analytics**
   - View task statistics
   - Monitor overdue tasks
   - See user workload distribution

4. **Role-Based Access**
   - Admin can create tasks
   - Admin can add/remove members
   - Members can only update their tasks

---

## 📱 Responsive Design

Try the app on different screen sizes:
- Desktop (> 1024px)
- Tablet (640px - 1024px)
- Mobile (< 640px)

---

## 🔐 Test Accounts

Create these test accounts to try multi-user features:

**Admin User:**
- Name: Admin User
- Email: admin@test.com
- Password: password123

**Member User:**
- Name: Team Member
- Email: member@test.com
- Password: password123

---

## 📸 What You Should See

### Login Page
- Clean login form
- Link to signup
- Email and password fields

### Dashboard
- 4 statistic cards
- Overdue tasks section
- Tasks by user chart

### Projects Page
- Project cards
- Create project button
- Member management

### Tasks Page
- 3 columns (TODO, IN_PROGRESS, DONE)
- Task cards with badges
- Create task button

---

## 🎯 API Endpoints Available

Test with browser or Postman:

```
GET  http://localhost:5000/health
POST http://localhost:5000/api/auth/signup
POST http://localhost:5000/api/auth/login
GET  http://localhost:5000/api/auth/profile
GET  http://localhost:5000/api/projects
GET  http://localhost:5000/api/tasks/my-tasks
GET  http://localhost:5000/api/dashboard/stats
```

---

## 💾 Database Location

Your SQLite database is located at:
```
backend/prisma/dev.db
```

View it with:
```powershell
cd backend
npx prisma studio
```

Opens at: http://localhost:5555

---

## 🔄 Restart Servers

If you need to restart:

1. Press `Ctrl + C` in both terminal windows
2. Run the commands again:
   - Backend: `cd backend && npm run dev`
   - Frontend: `cd frontend && npm run dev`

---

## 🎊 Success Indicators

✅ Backend running: See "Server running on port 5000"
✅ Frontend running: See "Local: http://localhost:3000"
✅ Can access login page
✅ Can create account
✅ Can create project
✅ Can create task
✅ Dashboard shows statistics

---

## 📞 Need Help?

Check these files:
- **SETUP.md** - Detailed setup guide
- **CHECKLIST.md** - Setup checklist
- **docs/api-documentation.md** - API reference
- **docs/testing-guide.md** - Testing procedures

---

## 🚀 You're All Set!

Your Team Task Manager is running and ready to use!

**Backend:** http://localhost:5000
**Frontend:** http://localhost:3000
**Database:** SQLite (backend/prisma/dev.db)

Start by creating an account and exploring the features!

Happy task managing! 🎉
