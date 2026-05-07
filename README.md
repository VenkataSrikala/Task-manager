# Team Task Manager

A full-stack collaborative task management system for teams to efficiently manage projects, assign tasks, and track progress.

## Features

- 🔐 JWT-based Authentication
- 👥 Role-Based Access Control (Admin/Member)
- 📊 Project Management
- ✅ Task Assignment & Tracking
- 📈 Dashboard Analytics
- ⏰ Overdue Task Monitoring
- 🎨 Responsive UI Design

## Tech Stack

**Frontend:**
- React.js + Vite
- Tailwind CSS
- Axios
- React Router DOM

**Backend:**
- Node.js + Express.js
- JWT Authentication
- bcryptjs

**Database:**
- MySQL
- Prisma ORM

## Project Structure

```
team-task-manager/
├── backend/          # Express.js API
├── frontend/         # React.js UI
└── docs/            # Documentation
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MySQL (v8+)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Configure DATABASE_URL and JWT_SECRET in .env
npx prisma migrate dev
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Configure VITE_API_URL in .env
npm run dev
```

## Environment Variables

**Backend (.env):**
```
DATABASE_URL="mysql://user:password@localhost:3306/taskmanager"
JWT_SECRET="your-secret-key"
PORT=5000
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:5000/api
```

## API Documentation

See [docs/api-documentation.md](docs/api-documentation.md)

## Deployment

See [docs/deployment-guide.md](docs/deployment-guide.md)

## License

MIT
