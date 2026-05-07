# Team Task Manager - Backend API

Express.js REST API for the Team Task Manager application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set:
- `DATABASE_URL`: MySQL connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 5000)

3. Run Prisma migrations:
```bash
npx prisma migrate dev
```

4. Generate Prisma client:
```bash
npx prisma generate
```

5. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - Get user projects
- `GET /api/projects/:projectId` - Get project details
- `POST /api/projects/:projectId/members` - Add member (admin only)
- `DELETE /api/projects/:projectId/members/:userId` - Remove member (admin only)
- `DELETE /api/projects/:projectId` - Delete project (admin only)

### Tasks
- `POST /api/tasks/projects/:projectId/tasks` - Create task (admin only)
- `GET /api/tasks/projects/:projectId/tasks` - Get project tasks
- `GET /api/tasks/my-tasks` - Get user's assigned tasks
- `PUT /api/tasks/:taskId` - Update task
- `DELETE /api/tasks/:taskId` - Delete task (admin only)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Database Schema

See `prisma/schema.prisma` for the complete database schema.

## Scripts

- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
