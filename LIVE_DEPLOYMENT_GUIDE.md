# 🚀 Live Deployment Guide - Railway

## Deploy Your Task Manager to Production (FREE)

**Your GitHub Repo:** https://github.com/VenkataSrikala/Task-manager

---

## 🎯 Option 1: Railway (Recommended - Easiest)

### Why Railway?
- ✅ Free tier available ($5 credit/month)
- ✅ Deploy directly from GitHub
- ✅ Automatic MySQL database
- ✅ Auto-deploy on git push
- ✅ HTTPS included
- ✅ No credit card required for trial

---

## 📋 Step-by-Step Railway Deployment

### Step 1: Sign Up for Railway

1. Go to: **https://railway.app/**
2. Click **"Start a New Project"**
3. Sign in with **GitHub** (easiest)
4. Authorize Railway to access your repositories

---

### Step 2: Deploy Backend

#### 2.1 Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose: **VenkataSrikala/Task-manager**
4. Railway will detect your project

#### 2.2 Configure Backend Service
1. Railway will ask which folder to deploy
2. Select **"backend"** folder
3. Or manually set:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command:** `npm start`

#### 2.3 Add MySQL Database
1. In your project, click **"New"**
2. Select **"Database"** → **"Add MySQL"**
3. Railway will provision a MySQL database
4. Copy the **DATABASE_URL** (it's automatically generated)

#### 2.4 Set Environment Variables
1. Click on your **backend service**
2. Go to **"Variables"** tab
3. Add these variables:

```env
DATABASE_URL=${{MySQL.DATABASE_URL}}
JWT_SECRET=your-super-secure-production-secret-key-min-32-characters
PORT=5000
NODE_ENV=production
```

**Important:** Change `JWT_SECRET` to a strong random string!

#### 2.5 Deploy Backend
1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. Railway will give you a URL like: `https://your-backend.railway.app`
4. **Copy this URL** - you'll need it for frontend!

---

### Step 3: Deploy Frontend

#### 3.1 Add Frontend Service
1. In same project, click **"New"**
2. Select **"GitHub Repo"** again
3. Choose: **VenkataSrikala/Task-manager**
4. This time select **"frontend"** folder

#### 3.2 Configure Frontend Service
1. Set:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run preview`

#### 3.3 Set Frontend Environment Variable
1. Click on **frontend service**
2. Go to **"Variables"** tab
3. Add:

```env
VITE_API_URL=https://your-backend.railway.app/api
```

**Replace** `your-backend.railway.app` with your actual backend URL from Step 2.5!

#### 3.4 Deploy Frontend
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. You'll get a URL like: `https://your-frontend.railway.app`

---

### Step 4: Test Your Live Application

1. **Open your frontend URL:** `https://your-frontend.railway.app`
2. **Sign up** for a new account
3. **Create a project**
4. **Add tasks**
5. **Test all features**

---

## ✅ Your App is Now LIVE!

**Frontend:** https://your-frontend.railway.app  
**Backend:** https://your-backend.railway.app  
**Database:** MySQL on Railway

---

## 🎯 Option 2: Vercel (Frontend) + Railway (Backend)

### Deploy Frontend on Vercel

1. Go to: **https://vercel.com/**
2. Sign in with **GitHub**
3. Click **"Add New Project"**
4. Select: **VenkataSrikala/Task-manager**
5. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend.railway.app/api
   ```
7. Click **"Deploy"**
8. You'll get: `https://task-manager-xxx.vercel.app`

### Deploy Backend on Railway
Follow Step 2 from Option 1 above.

---

## 🎯 Option 3: Render (Alternative Free Option)

### Deploy on Render

1. Go to: **https://render.com/**
2. Sign in with **GitHub**
3. Click **"New +"** → **"Web Service"**
4. Connect: **VenkataSrikala/Task-manager**

#### Backend Service:
- **Root Directory:** `backend`
- **Build Command:** `npm install && npx prisma generate && npx prisma migrate deploy`
- **Start Command:** `npm start`
- **Environment Variables:**
  ```
  DATABASE_URL=your-mysql-url
  JWT_SECRET=your-secret
  PORT=5000
  NODE_ENV=production
  ```

#### Frontend Service:
- **Root Directory:** `frontend`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run preview`
- **Environment Variables:**
  ```
  VITE_API_URL=https://your-backend.onrender.com/api
  ```

---

## 🔧 Important: Update Prisma Schema for Production

Before deploying, you need to switch from SQLite to MySQL:

### Update `backend/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

Then commit and push:
```bash
git add backend/prisma/schema.prisma
git commit -m "Update database to MySQL for production"
git push
```

Railway will auto-deploy the changes!

---

## 📊 Deployment Checklist

### Before Deployment:
- [x] Code pushed to GitHub ✅
- [ ] Change Prisma schema to MySQL
- [ ] Set strong JWT_SECRET
- [ ] Test locally one more time

### During Deployment:
- [ ] Backend deployed on Railway
- [ ] MySQL database created
- [ ] Environment variables set
- [ ] Frontend deployed
- [ ] Frontend connected to backend

### After Deployment:
- [ ] Test signup/login
- [ ] Test project creation
- [ ] Test task management
- [ ] Test dashboard
- [ ] Share your live URL!

---

## 🎉 Your Live URLs

After deployment, you'll have:

**Frontend (Users access this):**
```
https://your-app.railway.app
or
https://task-manager-xxx.vercel.app
```

**Backend (API):**
```
https://your-backend.railway.app
```

**Health Check:**
```
https://your-backend.railway.app/health
```

---

## 🔍 Monitoring & Logs

### Railway:
- Click on service → **"Deployments"** tab
- View logs in real-time
- Check metrics and usage

### Vercel:
- Go to project → **"Deployments"**
- Click on deployment → **"View Function Logs"**

---

## 💰 Cost Breakdown

### Railway (Recommended):
- **Free Tier:** $5 credit/month
- **Enough for:** Small to medium traffic
- **Upgrade:** $5/month for more resources

### Vercel:
- **Free Tier:** Unlimited for personal projects
- **Bandwidth:** 100GB/month
- **Perfect for:** Frontend hosting

---

## 🚨 Troubleshooting

### "Cannot connect to backend"
- Check VITE_API_URL is correct
- Make sure backend is deployed
- Check backend logs for errors

### "Database connection failed"
- Verify DATABASE_URL is set
- Check MySQL service is running
- Run migrations: `npx prisma migrate deploy`

### "Build failed"
- Check build logs
- Verify all dependencies in package.json
- Make sure Node version is compatible

---

## 🎯 Quick Deploy (Railway - Fastest)

1. **Sign up:** https://railway.app/
2. **New Project** → **Deploy from GitHub**
3. **Select repo:** VenkataSrikala/Task-manager
4. **Add MySQL** database
5. **Set environment variables**
6. **Deploy!**

**Time:** 10-15 minutes  
**Cost:** FREE (with $5 credit)

---

## 📞 Need Help?

If deployment fails:
1. Check Railway/Vercel logs
2. Verify environment variables
3. Check GitHub repo is public
4. Ensure all files are committed

---

## 🎊 Congratulations!

Once deployed, your Task Manager will be:
- ✅ Live on the internet
- ✅ Accessible from anywhere
- ✅ Using production database
- ✅ HTTPS secured
- ✅ Auto-deploying on git push
- ✅ Portfolio-ready!

---

**Ready to deploy?** Start with Railway - it's the easiest! 🚀

**Railway:** https://railway.app/
