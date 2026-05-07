# Deployment Guide

This guide covers deploying the Team Task Manager application to various platforms.

---

## Table of Contents
1. [Railway Deployment](#railway-deployment)
2. [Vercel + Railway](#vercel--railway)
3. [Docker Deployment](#docker-deployment)
4. [Traditional VPS](#traditional-vps)
5. [Environment Variables](#environment-variables)

---

## Railway Deployment

Railway is recommended for full-stack deployment with MySQL database.

### Backend Deployment

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select `backend` folder as root directory

3. **Add MySQL Database**
   - In your project, click "New"
   - Select "Database" → "MySQL"
   - Railway will provision a MySQL instance

4. **Configure Environment Variables**
   ```
   DATABASE_URL=${{MySQL.DATABASE_URL}}
   JWT_SECRET=your-production-secret-key-min-32-chars
   PORT=5000
   NODE_ENV=production
   ```

5. **Configure Build Settings**
   - Root Directory: `backend`
   - Build Command: `npm install && npx prisma generate && npx prisma migrate deploy`
   - Start Command: `npm start`

6. **Deploy**
   - Railway will automatically deploy
   - Note your backend URL (e.g., `https://your-app.railway.app`)

### Frontend Deployment

1. **Create Another Service**
   - In same project, click "New" → "GitHub Repo"
   - Select `frontend` folder

2. **Configure Environment Variables**
   ```
   VITE_API_URL=https://your-backend.railway.app/api
   ```

3. **Configure Build Settings**
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run preview`

4. **Deploy**
   - Frontend will be available at Railway URL

---

## Vercel + Railway

Deploy frontend on Vercel, backend on Railway.

### Backend on Railway
Follow Railway backend steps above.

### Frontend on Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Configure vercel.json**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "vite",
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

3. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

4. **Set Environment Variables**
   - Go to Vercel Dashboard
   - Project Settings → Environment Variables
   - Add: `VITE_API_URL=https://your-backend.railway.app/api`

5. **Redeploy**
   ```bash
   vercel --prod
   ```

---

## Docker Deployment

### Create Dockerfiles

**backend/Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

**frontend/Dockerfile:**
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**frontend/nginx.conf:**
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Docker Compose

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: taskmanager
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: mysql://root:rootpassword@mysql:3306/taskmanager
      JWT_SECRET: your-secret-key
      PORT: 5000
      NODE_ENV: production
    depends_on:
      - mysql
    command: sh -c "npx prisma migrate deploy && npm start"

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mysql_data:
```

### Deploy with Docker

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## Traditional VPS

Deploy on DigitalOcean, AWS EC2, or any VPS.

### Prerequisites
- Ubuntu 20.04+ server
- Domain name (optional)
- SSH access

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MySQL
sudo apt install -y mysql-server
sudo mysql_secure_installation

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

### 2. MySQL Setup

```bash
sudo mysql -u root -p

CREATE DATABASE taskmanager;
CREATE USER 'taskuser'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON taskmanager.* TO 'taskuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Deploy Backend

```bash
# Clone repository
git clone https://github.com/yourusername/team-task-manager.git
cd team-task-manager/backend

# Install dependencies
npm install

# Create .env file
nano .env
# Add:
# DATABASE_URL="mysql://taskuser:strong_password@localhost:3306/taskmanager"
# JWT_SECRET="your-secret-key"
# PORT=5000
# NODE_ENV=production

# Run migrations
npx prisma generate
npx prisma migrate deploy

# Start with PM2
pm2 start src/server.js --name task-backend
pm2 save
pm2 startup
```

### 4. Deploy Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
nano .env
# Add:
# VITE_API_URL=http://your-domain.com/api

# Build
npm run build

# Copy to nginx
sudo cp -r dist/* /var/www/html/
```

### 5. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/default
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
```

### 6. SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## Environment Variables

### Backend (.env)

**Development:**
```env
DATABASE_URL="mysql://root:password@localhost:3306/taskmanager"
JWT_SECRET="dev-secret-key"
PORT=5000
NODE_ENV=development
```

**Production:**
```env
DATABASE_URL="mysql://user:password@host:3306/taskmanager"
JWT_SECRET="super-secure-random-string-min-32-characters"
PORT=5000
NODE_ENV=production
```

### Frontend (.env)

**Development:**
```env
VITE_API_URL=http://localhost:5000/api
```

**Production:**
```env
VITE_API_URL=https://api.your-domain.com/api
```

---

## Post-Deployment Checklist

- [ ] Database migrations applied
- [ ] Environment variables configured
- [ ] SSL certificate installed
- [ ] CORS configured for production domain
- [ ] JWT secret is strong and unique
- [ ] Database credentials are secure
- [ ] Backup strategy implemented
- [ ] Monitoring setup (PM2, logs)
- [ ] Domain DNS configured
- [ ] Firewall rules configured
- [ ] Rate limiting enabled
- [ ] Error logging configured

---

## Monitoring

### PM2 Monitoring

```bash
# View status
pm2 status

# View logs
pm2 logs task-backend

# Monitor resources
pm2 monit

# Restart app
pm2 restart task-backend
```

### Database Backups

```bash
# Backup
mysqldump -u taskuser -p taskmanager > backup_$(date +%Y%m%d).sql

# Restore
mysql -u taskuser -p taskmanager < backup_20260507.sql

# Automated daily backup
crontab -e
# Add: 0 2 * * * mysqldump -u taskuser -p'password' taskmanager > /backups/backup_$(date +\%Y\%m\%d).sql
```

---

## Troubleshooting

### Backend Issues
```bash
# Check logs
pm2 logs task-backend

# Check database connection
npx prisma studio

# Restart service
pm2 restart task-backend
```

### Frontend Issues
```bash
# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Test Nginx config
sudo nginx -t

# Rebuild frontend
npm run build
sudo cp -r dist/* /var/www/html/
```

### Database Issues
```bash
# Check MySQL status
sudo systemctl status mysql

# Check connections
mysql -u taskuser -p -e "SHOW PROCESSLIST;"

# Reset migrations
npx prisma migrate reset
```

---

## Scaling Considerations

1. **Database**
   - Use connection pooling
   - Add read replicas
   - Implement caching (Redis)

2. **Backend**
   - Use load balancer
   - Deploy multiple instances
   - Implement rate limiting

3. **Frontend**
   - Use CDN for static assets
   - Enable gzip compression
   - Implement lazy loading

4. **Monitoring**
   - Setup error tracking (Sentry)
   - Add performance monitoring
   - Configure alerts

---

## Security Best Practices

1. Keep dependencies updated
2. Use strong JWT secrets
3. Implement rate limiting
4. Enable HTTPS only
5. Sanitize user inputs
6. Use prepared statements (Prisma does this)
7. Implement CSRF protection
8. Add security headers
9. Regular security audits
10. Backup database regularly

---

## Support

For deployment issues:
- Check application logs
- Verify environment variables
- Test database connection
- Check firewall rules
- Review Nginx configuration

Happy deploying! 🚀
