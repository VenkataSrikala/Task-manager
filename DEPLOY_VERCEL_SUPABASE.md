# 🚀 Deploy to Vercel + Supabase (100% Free)

## Why Vercel + Supabase?
- ✅ **100% FREE** forever
- ✅ Best for frontend (Vercel)
- ✅ Free PostgreSQL (Supabase)
- ✅ No credit card needed
- ✅ Lightning fast
- ✅ Auto-deploy from GitHub

**Your GitHub Repo:** https://github.com/VenkataSrikala/Task-manager

---

## 📋 Architecture

- **Frontend:** Vercel (React app)
- **Backend:** Vercel Serverless Functions
- **Database:** Supabase (PostgreSQL)

---

## Part 1: Deploy Database (Supabase)

### Step 1: Create Supabase Account

1. Go to: **https://supabase.com/**
2. Click **"Start your project"**
3. Sign in with **GitHub**
4. Authorize Supabase

### Step 2: Create New Project

1. Click **"New Project"**
2. Configure:
   - **Name:** `taskmanager`
   - **Database Password:** Create a strong password (save it!)
   - **Region:** Choose closest to you
   - **Plan:** **Free** (default)
3. Click **"Create new project"**
4. Wait 2-3 minutes for setup

### Step 3: Get Database URL

1. Go to **Project Settings** (gear icon)
2. Click **"Database"** in sidebar
3. Scroll to **"Connection string"**
4. Select **"URI"** tab
5. Copy the connection string
6. Replace `[YOUR-PASSWORD]` with your actual password
7. **Save this URL** - you'll need it!

Example:
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
```

### Step 4: Run Database Migrations

You have 2 options:

**Option A: Use Supabase SQL Editor**
1. In Supabase Dashboard, go to **"SQL Editor"**
2. Click **"New query"**
3. Copy content from `backend/database-schema.sql`
4. Paste and click **"Run"**
5. Tables created! ✅

**Option B: Use Prisma (Recommended)**
We'll do this after deploying backend.

---

## Part 2: Deploy Backend (Vercel)

### Step 1: Sign Up for Vercel

1. Go to: **https://vercel.com/**
2. Click **"Sign Up"**
3. Sign in with **GitHub**
4. Authorize Vercel

### Step 2: Deploy Backend

1. Click **"Add New..."** → **"Project"**
2. Import **"VenkataSrikala/Task-manager"**
3. Configure:

**Project Settings:**
- **Framework Preset:** Other
- **Root Directory:** `backend`
- **Build Command:** `npm install && npx prisma generate`
- **Output Directory:** Leave empty
- **Install Command:** `npm install`

**Environment Variables:**
Click **"Environment Variables"** and add:

```env
DATABASE_URL=postgresql://postgres:[password]@db.xxx.supabase.co:5432/postgres
JWT_SECRET=your-super-secure-random-string-minimum-32-characters
NODE_ENV=production
```

4. Click **"Deploy"**
5. Wait 2-3 minutes
6. Your backend will be at: `https://task-manager-xxx.vercel.app`
7. **Copy this URL!**

### Step 3: Run Migrations

After first deployment:
1. Go to your project in Vercel
2. Click **"Settings"** → **"Functions"**
3. Or run locally:
```bash
cd backend
DATABASE_URL="your-supabase-url" npx prisma migrate deploy
```

---

## Part 3: Deploy Frontend (Vercel)

### Step 1: Create New Project

1. In Vercel, click **"Add New..."** → **"Project"**
2. Import **"VenkataSrikala/Task-manager"** again
3. Configure:

**Project Settings:**
- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

**Environment Variables:**
```env
VITE_API_URL=https://your-backend.vercel.app/api
```

**Replace** with your actual backend URL from Part 2!

4. Click **"Deploy"**
5. Wait 2-3 minutes
6. Your app is live! 🎉

---

## ✅ Your Live URLs

**Frontend (Main App):**
```
https://task-manager-frontend.vercel.app
```

**Backend (API):**
```
https://task-manager-backend.vercel.app
```

**Database:**
```
Supabase PostgreSQL (managed)
```

---

## 🎯 Alternative: Vercel + Render

If you prefer Render for backend:

### Deploy Backend on Render:
Follow **DEPLOY_RENDER.md** for backend only

### Deploy Frontend on Vercel:
1. Go to Vercel
2. Import repository
3. Root Directory: `frontend`
4. Framework: Vite
5. Environment Variable:
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```
6. Deploy!

---

## 🔧 Custom Domain (Optional)

### Add Custom Domain to Vercel:

1. Go to your project in Vercel
2. Click **"Settings"** → **"Domains"**
3. Add your domain (e.g., `taskmanager.com`)
4. Follow DNS instructions
5. Vercel handles SSL automatically!

---

## 📊 Monitoring

### Vercel Analytics:
1. Go to your project
2. Click **"Analytics"** tab
3. See visitor stats, performance

### Supabase Monitoring:
1. Go to Supabase Dashboard
2. Click **"Database"** → **"Logs"**
3. See query logs, errors

---

## 🚨 Troubleshooting

### "Cannot connect to database"
- Verify DATABASE_URL is correct
- Check Supabase project is running
- Verify password in connection string

### "Build failed"
- Check build logs in Vercel
- Verify all dependencies in package.json
- Check Node version compatibility

### Frontend can't reach backend
- Verify VITE_API_URL is correct
- Check backend is deployed
- Test backend health endpoint

### CORS errors
- Backend already has CORS enabled
- Check API URL doesn't have trailing slash

---

## 💰 Cost Breakdown

### 100% FREE:
- ✅ **Vercel:** Unlimited personal projects
- ✅ **Supabase:** 500MB database, 2GB bandwidth
- ✅ **SSL:** Free HTTPS
- ✅ **Custom Domain:** Free
- ✅ **Auto-deploy:** Free

### If you need more:
- **Vercel Pro:** $20/month (more bandwidth)
- **Supabase Pro:** $25/month (8GB database)

---

## 🔄 Auto-Deploy

Both Vercel and Supabase auto-deploy on git push:

```bash
git add .
git commit -m "Update feature"
git push

# Vercel automatically deploys! ✅
```

---

## 🎯 Quick Deploy Checklist

- [ ] Create Supabase account
- [ ] Create database project
- [ ] Copy database URL
- [ ] Create Vercel account
- [ ] Deploy backend to Vercel
- [ ] Run database migrations
- [ ] Deploy frontend to Vercel
- [ ] Test live application
- [ ] Share your URL!

---

## 🔗 Useful Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Supabase Dashboard:** https://app.supabase.com/
- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs

---

## 🎉 Success!

Your Task Manager is now:
- ✅ Live on Vercel
- ✅ Using Supabase database
- ✅ 100% free
- ✅ Auto-deploying
- ✅ HTTPS secured
- ✅ Production-ready!

---

**Ready to deploy?** Start with Supabase database! 🚀

**Vercel:** https://vercel.com/  
**Supabase:** https://supabase.com/
