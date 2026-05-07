# Quick Reference Guide

Quick commands and snippets for Team Task Manager development.

---

## Installation

```bash
# Backend
cd backend
npm install
npx prisma generate

# Frontend
cd frontend
npm install
```

---

## Development

```bash
# Start backend (Terminal 1)
cd backend
npm run dev

# Start frontend (Terminal 2)
cd frontend
npm run dev
```

---

## Database

```bash
# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Reset database
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio

# Seed database (if seed file exists)
npx prisma db seed
```

---

## Common Commands

### Backend
```bash
# Development with hot reload
npm run dev

# Production
npm start

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Open Prisma Studio
npm run prisma:studio
```

### Frontend
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Environment Variables

### Backend (.env)
```env
DATABASE_URL="mysql://root:password@localhost:3306/taskmanager"
JWT_SECRET="your-secret-key"
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## API Endpoints

### Auth
```
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/profile
```

### Projects
```
POST   /api/projects
GET    /api/projects
GET    /api/projects/:id
POST   /api/projects/:id/members
DELETE /api/projects/:id/members/:userId
DELETE /api/projects/:id
```

### Tasks
```
POST   /api/tasks/projects/:projectId/tasks
GET    /api/tasks/projects/:projectId/tasks
GET    /api/tasks/my-tasks
PUT    /api/tasks/:taskId
DELETE /api/tasks/:taskId
```

### Dashboard
```
GET    /api/dashboard/stats
```

---

## Database Schema

### Users
```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(MEMBER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Projects
```prisma
model Project {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  creatorId   Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Tasks
```prisma
model Task {
  id          Int        @id @default(autoincrement())
  title       String
  description String?
  status      TaskStatus @default(TODO)
  priority    Priority   @default(MEDIUM)
  dueDate     DateTime?
  projectId   Int
  assignedTo  Int?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}
```

---

## Enums

```prisma
enum Role {
  ADMIN
  MEMBER
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  DONE
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}
```

---

## Common Queries

### Get user with projects
```javascript
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    createdProjects: true,
    projectMembers: {
      include: { project: true }
    }
  }
});
```

### Get project with tasks and members
```javascript
const project = await prisma.project.findUnique({
  where: { id: projectId },
  include: {
    tasks: {
      include: { assignedUser: true }
    },
    members: {
      include: { user: true }
    }
  }
});
```

### Get overdue tasks
```javascript
const overdueTasks = await prisma.task.findMany({
  where: {
    dueDate: { lt: new Date() },
    status: { not: 'DONE' }
  }
});
```

---

## Frontend Routes

```
/login          - Login page
/signup         - Signup page
/dashboard      - Dashboard (protected)
/projects       - Projects list (protected)
/tasks          - My tasks (protected)
```

---

## Component Structure

```
components/
├── common/
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Loader.jsx
│   └── ProtectedRoute.jsx
├── layout/
│   ├── Layout.jsx
│   └── Navbar.jsx
├── dashboard/
│   ├── DashboardCards.jsx
│   ├── TaskChart.jsx
│   └── OverdueTasks.jsx
├── projects/
│   ├── ProjectCard.jsx
│   ├── CreateProjectModal.jsx
│   └── MemberList.jsx
└── tasks/
    ├── TaskCard.jsx
    ├── CreateTaskModal.jsx
    ├── TaskStatusBadge.jsx
    └── TaskFilters.jsx
```

---

## Useful Snippets

### Create authenticated API request
```javascript
import api from '../api/axios';

export const getData = async () => {
  const response = await api.get('/endpoint');
  return response.data;
};
```

### Protected route wrapper
```javascript
<ProtectedRoute>
  <Layout>
    <YourComponent />
  </Layout>
</ProtectedRoute>
```

### Form with state
```javascript
const [formData, setFormData] = useState({ field: '' });

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  // Submit logic
};
```

---

## Debugging

### Backend
```javascript
// Add console logs
console.log('Debug:', variable);

// Check Prisma queries
const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});
```

### Frontend
```javascript
// React DevTools
// Install: https://react.dev/learn/react-developer-tools

// Console logs
console.log('State:', state);

// Network tab
// Check API requests and responses
```

---

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Stage changes
git add .

# Commit
git commit -m "feat: add feature description"

# Push
git push origin feature/feature-name

# Create pull request on GitHub
```

---

## Deployment

### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up
```

### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production
vercel --prod
```

---

## Troubleshooting

### Port already in use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### Database connection error
```bash
# Check MySQL is running
# Windows: Services → MySQL
# Linux: sudo systemctl status mysql

# Test connection
mysql -u root -p
```

### Prisma client not generated
```bash
cd backend
npx prisma generate
```

### Frontend build errors
```bash
# Clear cache
rm -rf node_modules
rm package-lock.json
npm install
```

---

## Performance Tips

1. Use Prisma select to fetch only needed fields
2. Implement pagination for large lists
3. Add database indexes for frequently queried fields
4. Use React.memo for expensive components
5. Lazy load routes with React.lazy()
6. Optimize images and assets
7. Enable gzip compression
8. Use CDN for static assets

---

## Security Checklist

- [ ] Passwords hashed with bcrypt
- [ ] JWT tokens with expiration
- [ ] Environment variables not committed
- [ ] SQL injection prevented (Prisma)
- [ ] XSS prevented (React)
- [ ] CORS configured properly
- [ ] HTTPS in production
- [ ] Rate limiting enabled
- [ ] Input validation
- [ ] Error messages don't leak info

---

## Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [JWT.io](https://jwt.io/)
- [Railway Docs](https://docs.railway.app/)

---

## Support

- Check logs for errors
- Use Prisma Studio to inspect database
- Test API with Postman
- Check browser console for frontend errors
- Review network tab for API issues

---

Quick reference complete! 📚
