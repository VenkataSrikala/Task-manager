# 📊 Database Structure - Simple SQL Tables

## Overview

Your Task Manager uses **4 simple SQL tables** with relationships.

---

## 📋 Table Structure

### 1. **users** Table
Stores all user information.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key (auto-increment) |
| name | VARCHAR(255) | User's full name |
| email | VARCHAR(255) | Unique email address |
| password | VARCHAR(255) | Hashed password (bcrypt) |
| role | VARCHAR(50) | User role (ADMIN/MEMBER) |
| created_at | TIMESTAMP | When user signed up |
| updated_at | TIMESTAMP | Last update time |

**Example:**
```sql
id | name        | email           | password      | role   | created_at
1  | John Doe    | john@test.com   | $2a$10$...   | MEMBER | 2026-05-07
2  | Jane Smith  | jane@test.com   | $2a$10$...   | ADMIN  | 2026-05-07
```

---

### 2. **projects** Table
Stores project information.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key (auto-increment) |
| name | VARCHAR(255) | Project name |
| description | TEXT | Project description |
| creator_id | INTEGER | Foreign key → users(id) |
| created_at | TIMESTAMP | When project was created |
| updated_at | TIMESTAMP | Last update time |

**Example:**
```sql
id | name              | description           | creator_id | created_at
1  | Website Redesign  | Redesign company site | 1          | 2026-05-07
2  | Mobile App        | Build iOS app         | 2          | 2026-05-07
```

---

### 3. **project_members** Table
Links users to projects (many-to-many relationship).

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key (auto-increment) |
| project_id | INTEGER | Foreign key → projects(id) |
| user_id | INTEGER | Foreign key → users(id) |
| role | VARCHAR(50) | Role in project (ADMIN/MEMBER) |
| joined_at | TIMESTAMP | When user joined project |

**Example:**
```sql
id | project_id | user_id | role   | joined_at
1  | 1          | 1       | ADMIN  | 2026-05-07
2  | 1          | 2       | MEMBER | 2026-05-07
3  | 2          | 2       | ADMIN  | 2026-05-07
```

**Meaning:**
- User 1 is ADMIN of Project 1
- User 2 is MEMBER of Project 1
- User 2 is ADMIN of Project 2

---

### 4. **tasks** Table
Stores all tasks.

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key (auto-increment) |
| title | VARCHAR(255) | Task title |
| description | TEXT | Task description |
| status | VARCHAR(50) | TODO/IN_PROGRESS/DONE |
| priority | VARCHAR(50) | LOW/MEDIUM/HIGH |
| due_date | TIMESTAMP | Task deadline (optional) |
| project_id | INTEGER | Foreign key → projects(id) |
| assigned_to | INTEGER | Foreign key → users(id) (optional) |
| created_at | TIMESTAMP | When task was created |
| updated_at | TIMESTAMP | Last update time |

**Example:**
```sql
id | title           | status      | priority | due_date   | project_id | assigned_to
1  | Design homepage | TODO        | HIGH     | 2026-05-15 | 1          | 2
2  | Write API docs  | IN_PROGRESS | MEDIUM   | 2026-05-20 | 1          | 1
3  | Test features   | DONE        | LOW      | 2026-05-10 | 1          | 2
```

---

## 🔗 Relationships

### One-to-Many:
- **users → projects**: One user can create many projects
- **projects → tasks**: One project can have many tasks
- **users → tasks**: One user can be assigned many tasks

### Many-to-Many:
- **users ↔ projects**: Through `project_members` table
  - One user can be in many projects
  - One project can have many users

---

## 📊 Visual Diagram

```
┌─────────────┐
│   users     │
│─────────────│
│ id (PK)     │───┐
│ name        │   │
│ email       │   │
│ password    │   │
│ role        │   │
└─────────────┘   │
                  │
                  │ creator_id (FK)
                  │
                  ↓
            ┌─────────────┐
            │  projects   │
            │─────────────│
            │ id (PK)     │───┐
            │ name        │   │
            │ description │   │
            │ creator_id  │   │
            └─────────────┘   │
                  ↑           │
                  │           │ project_id (FK)
                  │           │
    ┌─────────────┴───┐       │
    │                 │       │
    │ project_members │       ↓
    │─────────────────│  ┌─────────────┐
    │ id (PK)         │  │   tasks     │
    │ project_id (FK) │  │─────────────│
    │ user_id (FK)    │  │ id (PK)     │
    │ role            │  │ title       │
    └─────────────────┘  │ description │
                         │ status      │
                         │ priority    │
                         │ due_date    │
                         │ project_id  │
                         │ assigned_to │
                         └─────────────┘
```

---

## 🔍 Common Queries

### Get all projects for a user:
```sql
SELECT p.* 
FROM projects p
LEFT JOIN project_members pm ON p.id = pm.project_id
WHERE p.creator_id = 1 OR pm.user_id = 1;
```

### Get all tasks for a project:
```sql
SELECT t.*, u.name as assigned_user_name
FROM tasks t
LEFT JOIN users u ON t.assigned_to = u.id
WHERE t.project_id = 1;
```

### Get user's assigned tasks:
```sql
SELECT t.*, p.name as project_name
FROM tasks t
JOIN projects p ON t.project_id = p.id
WHERE t.assigned_to = 1;
```

### Get overdue tasks:
```sql
SELECT * FROM tasks
WHERE due_date < NOW() 
AND status != 'DONE';
```

### Get dashboard stats:
```sql
-- Total tasks
SELECT COUNT(*) FROM tasks WHERE project_id IN (user's projects);

-- Tasks by status
SELECT status, COUNT(*) 
FROM tasks 
WHERE project_id IN (user's projects)
GROUP BY status;

-- Tasks per user
SELECT u.name, COUNT(t.id) as task_count
FROM users u
LEFT JOIN tasks t ON u.id = t.assigned_to
WHERE t.project_id IN (user's projects)
GROUP BY u.id, u.name;
```

---

## 📝 SQL File Location

The complete SQL schema is in:
```
backend/database-schema.sql
```

You can:
1. **View it** to see the exact table structure
2. **Run it** directly in any SQL database
3. **Modify it** if needed

---

## 🚀 For Deployment

**Prisma handles this automatically!**

When you deploy on Railway:
1. Railway provides PostgreSQL database
2. Prisma reads `schema.prisma`
3. Prisma creates these tables automatically
4. You don't need to run SQL manually!

**But if you want to create tables manually:**
```bash
# Connect to your database
psql -h hostname -U username -d database_name

# Run the SQL file
\i backend/database-schema.sql
```

---

## 🎯 Summary

**4 Simple Tables:**
1. **users** - Who can use the system
2. **projects** - What projects exist
3. **project_members** - Who is in which project
4. **tasks** - What needs to be done

**That's it!** Simple and clean database structure. 🎉

---

**File:** `backend/database-schema.sql` contains the complete SQL code.
