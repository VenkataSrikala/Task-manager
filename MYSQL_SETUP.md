# MySQL Setup Guide for Windows

## Option 1: Install MySQL (Recommended)

### Download and Install MySQL
1. Go to https://dev.mysql.com/downloads/installer/
2. Download "MySQL Installer for Windows"
3. Run the installer
4. Choose "Developer Default" setup type
5. Set root password (remember this!)
6. Complete installation

### Start MySQL Service
```powershell
# Start MySQL service
net start MySQL80

# Or use Services app
# Press Win + R, type "services.msc"
# Find "MySQL80" and click Start
```

### Verify MySQL is Running
```powershell
# Check if MySQL is running
Get-Service -Name "MySQL*"

# Should show Status: Running
```

### Create Database
```powershell
# Connect to MySQL
mysql -u root -p

# Enter your password, then run:
CREATE DATABASE taskmanager;
EXIT;
```

### Update Backend .env
```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/taskmanager"
```

---

## Option 2: Use XAMPP (Easier for Beginners)

### Install XAMPP
1. Download from https://www.apachefriends.org/
2. Install XAMPP
3. Open XAMPP Control Panel
4. Click "Start" next to MySQL

### Create Database
1. Open browser: http://localhost/phpmyadmin
2. Click "New" in left sidebar
3. Database name: `taskmanager`
4. Click "Create"

### Update Backend .env
```env
DATABASE_URL="mysql://root:@localhost:3306/taskmanager"
```
(Note: XAMPP MySQL has no password by default)

---

## Option 3: Use Docker (For Advanced Users)

### Install Docker Desktop
1. Download from https://www.docker.com/products/docker-desktop
2. Install and start Docker Desktop

### Run MySQL Container
```powershell
docker run --name mysql-taskmanager -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=taskmanager -p 3306:3306 -d mysql:8
```

### Update Backend .env
```env
DATABASE_URL="mysql://root:password@localhost:3306/taskmanager"
```

---

## Option 4: Use SQLite (Quick Test - No MySQL Needed)

If you just want to test quickly without MySQL:

### Update Prisma Schema
Edit `backend/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

### Update Backend .env
```env
DATABASE_URL="file:./dev.db"
```

### Install SQLite Dependency
```powershell
cd backend
npm install @prisma/client
```

---

## After MySQL is Running

### Run These Commands:

```powershell
# 1. Generate Prisma Client
cd backend
npx prisma generate

# 2. Run Migrations
npx prisma migrate dev --name init

# 3. Verify Database
npx prisma studio
# Opens at http://localhost:5555
```

---

## Troubleshooting

### "Can't reach database server"
- MySQL service is not running
- Check Windows Services for MySQL
- Try: `net start MySQL80`

### "Access denied for user"
- Wrong password in DATABASE_URL
- Check your MySQL root password

### "Unknown database 'taskmanager'"
- Database not created
- Run: `CREATE DATABASE taskmanager;` in MySQL

### Port 3306 already in use
- Another MySQL instance is running
- Stop other MySQL services
- Or change port in DATABASE_URL

---

## Quick Check Commands

```powershell
# Check if MySQL is running
Get-Service -Name "MySQL*"

# Check if port 3306 is in use
netstat -ano | findstr :3306

# Test MySQL connection
mysql -u root -p -e "SHOW DATABASES;"
```

---

## Recommended: XAMPP for Quick Start

For the fastest setup on Windows:
1. Install XAMPP
2. Start MySQL from XAMPP Control Panel
3. Use DATABASE_URL: `mysql://root:@localhost:3306/taskmanager`
4. Create database via phpMyAdmin
5. Run migrations

This is the easiest way to get started!

---

## Need Help?

If you're stuck:
1. Check if MySQL service is running
2. Verify DATABASE_URL in backend/.env
3. Try XAMPP as the easiest option
4. Or use SQLite for quick testing

Once MySQL is running, come back and run:
```powershell
cd backend
npx prisma migrate dev --name init
npm run dev
```
