# Testing Guide

This guide covers manual and automated testing for the Team Task Manager application.

---

## Manual Testing

### 1. Authentication Flow

#### Sign Up
1. Navigate to http://localhost:3000/signup
2. Fill in:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "password123"
3. Click "Sign Up"
4. ✅ Should redirect to dashboard
5. ✅ Should see user name in navbar

#### Login
1. Navigate to http://localhost:3000/login
2. Fill in credentials
3. Click "Login"
4. ✅ Should redirect to dashboard
5. ✅ Token should be stored in localStorage

#### Logout
1. Click "Logout" button in navbar
2. ✅ Should redirect to login page
3. ✅ Token should be removed from localStorage

#### Protected Routes
1. Logout
2. Try to access http://localhost:3000/dashboard
3. ✅ Should redirect to login page

---

### 2. Project Management

#### Create Project
1. Login as user
2. Navigate to "Projects" page
3. Click "Create Project"
4. Fill in:
   - Name: "Test Project"
   - Description: "This is a test project"
5. Click "Create"
6. ✅ Project should appear in list
7. ✅ User should be admin of project

#### View Project Details
1. Click "View Details" on a project
2. ✅ Should see project members
3. ✅ Should see member count
4. ✅ Should see task count

#### Add Member (Admin Only)
1. As project admin, view project details
2. Enter member email in input field
3. Click "Add Member"
4. ✅ Member should appear in list
5. ✅ Member should receive MEMBER role

#### Remove Member (Admin Only)
1. As project admin, view project details
2. Click "Remove" next to a member
3. Confirm removal
4. ✅ Member should be removed from list

#### Delete Project (Admin Only)
1. As project admin
2. Click delete button on project
3. Confirm deletion
4. ✅ Project should be removed
5. ✅ All tasks should be deleted

---

### 3. Task Management

#### Create Task
1. Navigate to "My Tasks" page
2. Click "Create Task"
3. Select a project
4. Fill in:
   - Title: "Test Task"
   - Description: "Task description"
   - Priority: "HIGH"
   - Due Date: Future date
5. Click "Create"
6. ✅ Task should appear in TODO column

#### Update Task Status
1. Find a task in any column
2. Change status dropdown
3. ✅ Task should move to new column
4. ✅ Status should persist on refresh

#### View Task Details
1. Click on a task card
2. ✅ Should see full description
3. ✅ Should see priority badge
4. ✅ Should see due date
5. ✅ Should see project name

#### Overdue Tasks
1. Create task with past due date
2. ✅ Task should have red border
3. ✅ Should appear in dashboard overdue section

---

### 4. Dashboard

#### View Statistics
1. Navigate to Dashboard
2. ✅ Should see total tasks count
3. ✅ Should see tasks by status (TODO, IN_PROGRESS, DONE)
4. ✅ Should see overdue tasks count
5. ✅ Should see tasks by user distribution

#### Overdue Tasks Section
1. Create tasks with past due dates
2. ✅ Should appear in overdue section
3. ✅ Should show task title, due date, assignee

#### Tasks by User
1. Assign tasks to different users
2. ✅ Should show user names
3. ✅ Should show task count per user

---

### 5. Role-Based Access Control

#### Admin Permissions
1. Login as project creator
2. ✅ Can create tasks
3. ✅ Can add members
4. ✅ Can remove members
5. ✅ Can delete project
6. ✅ Can delete tasks

#### Member Permissions
1. Login as project member
2. ✅ Can view project
3. ✅ Can view tasks
4. ✅ Can update own task status
5. ❌ Cannot add members
6. ❌ Cannot remove members
7. ❌ Cannot delete project
8. ❌ Cannot create tasks

---

## API Testing with Postman

### Setup
1. Import the following collection
2. Set base URL: `http://localhost:5000/api`
3. Create environment variable: `token`

### Test Cases

#### 1. Auth - Sign Up
```
POST /auth/signup
Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Expected: 201 Created
Response should include user and token
```

#### 2. Auth - Login
```
POST /auth/login
Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Expected: 200 OK
Save token to environment variable
```

#### 3. Auth - Get Profile
```
GET /auth/profile
Headers:
Authorization: Bearer {{token}}

Expected: 200 OK
Response should include user details
```

#### 4. Projects - Create
```
POST /projects
Headers:
Authorization: Bearer {{token}}
Body:
{
  "name": "Test Project",
  "description": "Project description"
}

Expected: 201 Created
Save projectId to environment
```

#### 5. Projects - Get All
```
GET /projects
Headers:
Authorization: Bearer {{token}}

Expected: 200 OK
Should return array of projects
```

#### 6. Projects - Add Member
```
POST /projects/{{projectId}}/members
Headers:
Authorization: Bearer {{token}}
Body:
{
  "email": "member@example.com"
}

Expected: 201 Created
```

#### 7. Tasks - Create
```
POST /tasks/projects/{{projectId}}/tasks
Headers:
Authorization: Bearer {{token}}
Body:
{
  "title": "Test Task",
  "description": "Task description",
  "status": "TODO",
  "priority": "HIGH",
  "dueDate": "2026-12-31",
  "assignedTo": 2
}

Expected: 201 Created
Save taskId to environment
```

#### 8. Tasks - Get My Tasks
```
GET /tasks/my-tasks
Headers:
Authorization: Bearer {{token}}

Expected: 200 OK
Should return user's assigned tasks
```

#### 9. Tasks - Update
```
PUT /tasks/{{taskId}}
Headers:
Authorization: Bearer {{token}}
Body:
{
  "status": "IN_PROGRESS"
}

Expected: 200 OK
```

#### 10. Dashboard - Get Stats
```
GET /dashboard/stats
Headers:
Authorization: Bearer {{token}}

Expected: 200 OK
Should return dashboard statistics
```

---

## Testing with cURL

### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Create Project
```bash
TOKEN="your-jwt-token"

curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Test Project",
    "description": "Project description"
  }'
```

### Get Dashboard Stats
```bash
curl -X GET http://localhost:5000/api/dashboard/stats \
  -H "Authorization: Bearer $TOKEN"
```

---

## Database Testing

### Using Prisma Studio

```bash
cd backend
npx prisma studio
```

This opens a GUI at http://localhost:5555 where you can:
- View all tables
- Add/edit/delete records
- Test relationships
- Verify data integrity

### Manual SQL Queries

```bash
mysql -u root -p taskmanager
```

```sql
-- View all users
SELECT * FROM users;

-- View projects with member count
SELECT p.*, COUNT(pm.id) as member_count
FROM projects p
LEFT JOIN project_members pm ON p.id = pm.projectId
GROUP BY p.id;

-- View tasks with assignee
SELECT t.*, u.name as assignee_name
FROM tasks t
LEFT JOIN users u ON t.assignedTo = u.id;

-- View overdue tasks
SELECT * FROM tasks
WHERE dueDate < NOW() AND status != 'DONE';
```

---

## Edge Cases to Test

### Authentication
- [ ] Login with wrong password
- [ ] Login with non-existent email
- [ ] Sign up with existing email
- [ ] Access protected route without token
- [ ] Access protected route with expired token
- [ ] Access protected route with invalid token

### Projects
- [ ] Create project with empty name
- [ ] Add non-existent user as member
- [ ] Add same user twice as member
- [ ] Remove project creator from project
- [ ] Delete project with tasks
- [ ] Access project user is not member of

### Tasks
- [ ] Create task without title
- [ ] Create task with past due date
- [ ] Assign task to non-member
- [ ] Update task status to invalid value
- [ ] Delete task that doesn't exist
- [ ] Member trying to delete task (should fail)

### Dashboard
- [ ] Dashboard with no projects
- [ ] Dashboard with no tasks
- [ ] Dashboard with all tasks done
- [ ] Dashboard with multiple overdue tasks

---

## Performance Testing

### Load Testing with Apache Bench

```bash
# Install Apache Bench
sudo apt install apache2-utils

# Test login endpoint
ab -n 1000 -c 10 -p login.json -T application/json \
  http://localhost:5000/api/auth/login

# Test get projects (with auth)
ab -n 1000 -c 10 -H "Authorization: Bearer TOKEN" \
  http://localhost:5000/api/projects
```

### Expected Performance
- Login: < 200ms
- Get Projects: < 100ms
- Create Task: < 150ms
- Dashboard Stats: < 300ms

---

## Security Testing

### SQL Injection
Try injecting SQL in inputs:
```
email: admin' OR '1'='1
password: ' OR '1'='1' --
```
✅ Should be prevented by Prisma

### XSS (Cross-Site Scripting)
Try injecting scripts:
```
name: <script>alert('XSS')</script>
description: <img src=x onerror=alert('XSS')>
```
✅ Should be sanitized by React

### JWT Token
- [ ] Try accessing API with no token
- [ ] Try accessing API with expired token
- [ ] Try accessing API with modified token
- [ ] Try accessing API with token from different user

### CORS
- [ ] Try accessing API from different origin
- [ ] Verify CORS headers in response

---

## Automated Testing (Future)

### Backend Unit Tests (Jest)

```javascript
// Example: authService.test.js
describe('Auth Service', () => {
  test('should register new user', async () => {
    const user = await registerUser({
      name: 'Test',
      email: 'test@test.com',
      password: 'password'
    });
    expect(user).toHaveProperty('id');
    expect(user.email).toBe('test@test.com');
  });

  test('should not register duplicate email', async () => {
    await expect(
      registerUser({
        name: 'Test',
        email: 'existing@test.com',
        password: 'password'
      })
    ).rejects.toThrow('Email already registered');
  });
});
```

### Frontend Component Tests (React Testing Library)

```javascript
// Example: Login.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

test('renders login form', () => {
  render(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('submits form with credentials', async () => {
  render(<Login />);
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'test@test.com' }
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password' }
  });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  // Assert API call was made
});
```

### E2E Tests (Cypress)

```javascript
// Example: auth.cy.js
describe('Authentication', () => {
  it('should sign up new user', () => {
    cy.visit('/signup');
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('should login existing user', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

---

## Test Checklist

### Before Release
- [ ] All manual tests pass
- [ ] All API endpoints tested
- [ ] Role-based access control verified
- [ ] Edge cases handled
- [ ] Error messages are user-friendly
- [ ] Loading states work correctly
- [ ] Forms validate inputs
- [ ] Database relationships work
- [ ] Authentication flow complete
- [ ] Dashboard displays correct data

### Performance
- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms
- [ ] No memory leaks
- [ ] Database queries optimized
- [ ] Images optimized
- [ ] Bundle size reasonable

### Security
- [ ] Passwords are hashed
- [ ] JWT tokens expire
- [ ] SQL injection prevented
- [ ] XSS prevented
- [ ] CSRF protection (if needed)
- [ ] HTTPS in production
- [ ] Environment variables secure

### Browser Compatibility
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Mobile Responsiveness
- [ ] Mobile (< 640px)
- [ ] Tablet (640px - 1024px)
- [ ] Desktop (> 1024px)

---

## Reporting Bugs

When reporting bugs, include:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Screenshots/videos
5. Browser/OS information
6. Console errors
7. Network requests (if API related)

---

## Continuous Testing

1. Test after every feature addition
2. Test after bug fixes
3. Regression testing before releases
4. Performance testing weekly
5. Security audits monthly

Happy testing! 🧪
