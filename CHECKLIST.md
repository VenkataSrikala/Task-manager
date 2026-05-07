# Team Task Manager - Setup Checklist

Use this checklist to ensure everything is properly set up before running the application.

---

## 📋 Pre-Installation Checklist

### System Requirements
- [ ] Node.js v16+ installed
- [ ] MySQL v8+ installed
- [ ] npm or yarn installed
- [ ] Git installed (optional)
- [ ] Code editor (VS Code recommended)

### Verify Installations
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check MySQL
mysql --version
```

---

## 🗄️ Database Setup Checklist

### MySQL Configuration
- [ ] MySQL server is running
- [ ] MySQL root password is known
- [ ] Can connect to MySQL

### Database Creation
```sql
-- Run in MySQL
CREATE DATABASE taskmanager;
```

- [ ] Database 'taskmanager' created
- [ ] Database user has proper permissions

### Test Connection
```bash
mysql -u root -p taskmanager
```
- [ ] Successfully connected to database

---

## 🔧 Backend Setup Checklist

### Installation
- [ ] Navigate to backend folder: `cd backend`
- [ ] Run `npm install`
- [ ] All dependencies installed successfully
- [ ] No critical errors in installation

### Environment Configuration
- [ ] `.env` file exists in backend folder
- [ ] `DATABASE_URL` is configured correctly
- [ ] `JWT_SECRET` is set (change from default!)
- [ ] `PORT` is set (default: 5000)
- [ ] `NODE_ENV` is set

Example `.env`:
```env
DATABASE_URL="mysql://root:your_password@localhost:3306/taskmanager"
JWT_SECRET="change-this-to-a-secure-random-string"
PORT=5000
NODE_ENV=development
```

### Prisma Setup
- [ ] Run `npx prisma generate`
- [ ] Prisma client generated successfully
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Database tables created
- [ ] No migration errors

### Verify Database Schema
```bash
npx prisma studio
```
- [ ] Prisma Studio opens at http://localhost:5555
- [ ] Can see all tables: users, projects, tasks, project_members
- [ ] Tables have correct columns

### Test Backend Server
```bash
npm run dev
```
- [ ] Server starts without errors
- [ ] See message: "🚀 Server running on port 5000"
- [ ] Visit http://localhost:5000/health
- [ ] Health check returns: `{"status":"ok","message":"Server is running"}`

---

## 🎨 Frontend Setup Checklist

### Installation
- [ ] Navigate to frontend folder: `cd frontend`
- [ ] Run `npm install`
- [ ] All dependencies installed successfully
- [ ] No critical errors in installation

### Environment Configuration
- [ ] `.env` file exists in frontend folder
- [ ] `VITE_API_URL` is configured correctly

Example `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### Test Frontend Server
```bash
npm run dev
```
- [ ] Server starts without errors
- [ ] See message with local URL (usually http://localhost:3000)
- [ ] Visit the URL in browser
- [ ] Login page loads correctly
- [ ] No console errors in browser

---

## 🧪 Functionality Testing Checklist

### Authentication
- [ ] Can access signup page
- [ ] Can create new account
- [ ] Redirects to dashboard after signup
- [ ] Can logout
- [ ] Can login with created account
- [ ] Token is stored in localStorage
- [ ] Protected routes redirect to login when not authenticated

### Projects
- [ ] Can access projects page
- [ ] Can create new project
- [ ] Project appears in list
- [ ] Can view project details
- [ ] Can add member by email (need second user)
- [ ] Can remove member
- [ ] Member count updates correctly

### Tasks
- [ ] Can access tasks page
- [ ] Can create new task
- [ ] Task appears in TODO column
- [ ] Can change task status
- [ ] Task moves to correct column
- [ ] Can see task priority badge
- [ ] Can see due date
- [ ] Overdue tasks have red border

### Dashboard
- [ ] Can access dashboard
- [ ] See total tasks count
- [ ] See tasks by status breakdown
- [ ] See overdue tasks section
- [ ] See tasks by user distribution
- [ ] Statistics update when tasks change

---

## 🔒 Security Checklist

### Backend Security
- [ ] Passwords are hashed (not visible in database)
- [ ] JWT secret is changed from default
- [ ] JWT secret is at least 32 characters
- [ ] Environment variables not committed to git
- [ ] CORS is configured
- [ ] Protected routes require authentication

### Frontend Security
- [ ] Token is stored securely
- [ ] Token is sent in Authorization header
- [ ] Auto logout on token expiration
- [ ] Protected routes implemented
- [ ] No sensitive data in console logs

---

## 📱 UI/UX Checklist

### Responsive Design
- [ ] Works on mobile (< 640px)
- [ ] Works on tablet (640px - 1024px)
- [ ] Works on desktop (> 1024px)
- [ ] Navigation is accessible on all sizes
- [ ] Forms are usable on mobile

### User Experience
- [ ] Loading states show when fetching data
- [ ] Error messages are clear and helpful
- [ ] Success messages confirm actions
- [ ] Forms validate input
- [ ] Buttons have hover effects
- [ ] Links are clearly visible
- [ ] Color contrast is sufficient

---

## 🚀 Deployment Readiness Checklist

### Code Quality
- [ ] No console.log statements in production code
- [ ] No commented-out code
- [ ] No TODO comments for critical features
- [ ] Code is properly formatted
- [ ] No unused imports

### Configuration
- [ ] Production environment variables prepared
- [ ] Database connection string for production
- [ ] Strong JWT secret for production
- [ ] CORS configured for production domain
- [ ] NODE_ENV set to 'production'

### Testing
- [ ] All features tested manually
- [ ] All API endpoints tested
- [ ] Role-based access tested
- [ ] Error scenarios tested
- [ ] Edge cases handled

### Documentation
- [ ] README.md is up to date
- [ ] API documentation is complete
- [ ] Deployment guide is ready
- [ ] Environment variables documented

---

## 🐛 Troubleshooting Checklist

### Backend Issues
If backend doesn't start:
- [ ] Check if MySQL is running
- [ ] Verify DATABASE_URL in .env
- [ ] Check if port 5000 is available
- [ ] Look for error messages in terminal
- [ ] Try `npm install` again
- [ ] Try `npx prisma generate` again

### Frontend Issues
If frontend doesn't start:
- [ ] Check if backend is running
- [ ] Verify VITE_API_URL in .env
- [ ] Check if port 3000 is available
- [ ] Look for error messages in terminal
- [ ] Try `npm install` again
- [ ] Clear browser cache

### Database Issues
If database connection fails:
- [ ] MySQL service is running
- [ ] Database 'taskmanager' exists
- [ ] Username and password are correct
- [ ] Host and port are correct
- [ ] User has proper permissions

### Authentication Issues
If login doesn't work:
- [ ] Backend is running
- [ ] User exists in database
- [ ] Password is correct
- [ ] JWT_SECRET is set
- [ ] Check browser console for errors
- [ ] Check network tab for API response

---

## ✅ Final Verification

### Complete System Test
1. [ ] Start MySQL
2. [ ] Start backend server
3. [ ] Start frontend server
4. [ ] Create new user account
5. [ ] Create a project
6. [ ] Add a task
7. [ ] Update task status
8. [ ] View dashboard
9. [ ] Logout
10. [ ] Login again

### All Systems Go!
- [ ] Backend running ✅
- [ ] Frontend running ✅
- [ ] Database connected ✅
- [ ] Authentication working ✅
- [ ] All features functional ✅

---

## 🎉 Success!

If all items are checked, your Team Task Manager is ready to use!

### Quick Start Commands

**Start Everything (Windows):**
```bash
start-dev.bat
```

**Or manually:**

Terminal 1:
```bash
cd backend
npm run dev
```

Terminal 2:
```bash
cd frontend
npm run dev
```

Then visit: http://localhost:3000

---

## 📞 Need Help?

If you encounter issues:
1. Check this checklist again
2. Review SETUP.md
3. Check docs/troubleshooting section
4. Review error messages carefully
5. Check browser console
6. Check terminal output

---

**Happy Task Managing! 🚀**
