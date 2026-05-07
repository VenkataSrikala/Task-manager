# 🚀 Deploy to Render (Free Alternative)

## Why Render?
- ✅ **100% FREE** tier (no credit card needed)
- ✅ Deploy from GitHub automatically
- ✅ Free PostgreSQL database
- ✅ HTTPS included
- ✅ Auto-deploy on git push
- ✅ Easy setup (10 minutes)

**Your GitHub Repo:** https://github.com/VenkataSrikala/Task-manager

---

## 📋 Step-by-Step Deployment

### Step 1: Sign Up for Render

1. Go to: **https://render.com/**
2. Click **"Get Started"**
3. Sign up with **GitHub** (easiest)
4. Authorize Render to access your repositories

---

### Step 2: Create PostgreSQL Database

1. From Render Dashboard, click **"New +"**
2. Select **"PostgreSQL"**
3. Configure:
   - **Name:** `taskmanager-db`
   - **Database:** `taskmanager`
   - **User:** `taskmanager_user`
   - **Region:** Choose closest to you
   - **Plan:** **Free** (select this!)
4. Click **"Create Database"**
5. Wait 2-3 minutes for database to be ready
6. **Copy the "Internal Database URL"** - you'll need this!

---

### Step 3: Deploy Backend

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository:
   - Select **"VenkataSrikala/Task-manager"**
3. Configure the service:

**Basic Settings:**
- **Name:** `taskmanager-backend`
- **Region:** Same as database
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:**
  ```bash
  npm install && npx prisma generate && npx prisma migrate deploy
  ```
- **Start Command:**
  ```bash
  npm start
  ```

**Advanced Settings:**
- **Plan:** **Free** (select this!)
- **Auto-Deploy:** Yes (enable)

4. Click **"Advanced"** and add **Environment Variables:**

```env
DATABASE_URL=<paste-your-internal-database-url-here>
JWT_SECRET=your-super-secure-random-string-minimum-32-characters-long
PORT=5000
NODE_ENV=production
```

**Important:** 
- Replace `DATABASE_URL` with the Internal Database URL you copied in Step 2
- Change `JWT_SECRET` to a strong random string!

5. Click **"Create Web Service"**
6. Wait 5-10 minutes for deployment
7. Your backend will be live at: `https://taskmanager-backend.onrender.com`
8. **Copy this URL** - you need it for frontend!

---

### Step 4: Deploy Frontend

1. Click **"New +"** → **"Web Service"**
2. Select **"VenkataSrikala/Task-manager"** again
3. Configure:

**Basic Settings:**
- **Name:** `taskmanager-frontend`
- **Region:** Same as backend
- **Branch:** `main`
- **Root Directory:** `frontend`
- **Runtime:** `Node`
- **Build Command:**
  ```bash
  npm install && npm run build
  ```
- **Start Command:**
  ```bash
  npm run preview
  ```

**Advanced Settings:**
- **Plan:** **Free**
- **Auto-Deploy:** Yes

4. Add **Environment Variable:**

```env
VITE_API_URL=https://taskmanager-backend.onrender.com/api
```

**Replace** `taskmanager-backend` with your actual backend URL!

5. Click **"Create Web Service"**
6. Wait 5-10 minutes for deployment

---

### Step 5: Test Your Live App! 🎉

1. Open your frontend URL: `https://taskmanager-frontend.onrender.com`
2. Sign up for a new account
3. Create a project
4. Add tasks
5. Test all features!

---

## ✅ Your Live URLs

**Frontend (Users access this):**
```
https://taskmanager-frontend.onrender.com
```

**Backend (API):**
```
https://taskmanager-backend.onrender.com
```

**Health Check:**
```
https://taskmanager-backend.onrender.com/health
```

**Database:**
```
PostgreSQL on Render (managed)
```

---

## 🎯 Important Notes

### Free Tier Limitations:
- ⚠️ **Services spin down after 15 minutes of inactivity**
- ⚠️ **First request after inactivity takes 30-60 seconds** (cold start)
- ✅ **750 hours/month free** (enough for 1 service 24/7)
- ✅ **Unlimited bandwidth**
- ✅ **Free PostgreSQL database** (90 days, then $7/month)

### To Keep Services Active:
Use a service like **UptimeRobot** (free) to ping your backend every 10 minutes:
1. Go to: https://uptimerobot.com/
2. Add monitor for: `https://taskmanager-backend.onrender.com/health`
3. Check every 5 minutes
4. This keeps your service awake!

---

## 🔧 Configuration Files

Render automatically detects your setup, but you can also create `render.yaml`:

```yaml
services:
  # Backend Service
  - type: web
    name: taskmanager-backend
    runtime: node
    rootDir: backend
    buildCommand: npm install && npx prisma generate && npx prisma migrate deploy
    startCommand: npm start
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: taskmanager-db
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
      - key: PORT
        value: 5000
      - key: NODE_ENV
        value: production

  # Frontend Service
  - type: web
    name: taskmanager-frontend
    runtime: node
    rootDir: frontend
    buildCommand: npm install && npm run build
    startCommand: npm run preview
    envVars:
      - key: VITE_API_URL
        value: https://taskmanager-backend.onrender.com/api

databases:
  - name: taskmanager-db
    databaseName: taskmanager
    user: taskmanager_user
```

---

## 📊 Monitoring & Logs

### View Logs:
1. Go to your service in Render Dashboard
2. Click **"Logs"** tab
3. See real-time logs

### View Metrics:
1. Click **"Metrics"** tab
2. See CPU, Memory, Bandwidth usage

### Database Management:
1. Go to your database in Dashboard
2. Click **"Connect"** to get connection details
3. Use any PostgreSQL client to connect

---

## 🔄 Auto-Deploy

Render automatically deploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push

# Render automatically deploys! ✅
```

---

## 🚨 Troubleshooting

### "Service Unavailable" Error
- Service is spinning up (wait 30-60 seconds)
- Check logs for errors
- Verify environment variables

### "Cannot connect to database"
- Check DATABASE_URL is correct
- Verify database is running
- Check database logs

### "Build Failed"
- Check build logs in Render
- Verify package.json is correct
- Make sure all dependencies are listed

### Frontend can't reach backend
- Verify VITE_API_URL is correct
- Check backend is deployed and running
- Test backend health endpoint

---

## 💰 Cost Breakdown

### Free Tier (What you get):
- ✅ **Web Services:** 750 hours/month (1 service 24/7)
- ✅ **PostgreSQL:** Free for 90 days, then $7/month
- ✅ **Bandwidth:** Unlimited
- ✅ **SSL:** Free HTTPS
- ✅ **Custom Domain:** Free

### If you need more:
- **Starter Plan:** $7/month per service
- **No cold starts**
- **More resources**

---

## 🎯 Quick Deploy Checklist

- [ ] Sign up for Render
- [ ] Create PostgreSQL database
- [ ] Copy database URL
- [ ] Deploy backend with env variables
- [ ] Copy backend URL
- [ ] Deploy frontend with backend URL
- [ ] Test live application
- [ ] Set up UptimeRobot (optional)
- [ ] Share your live URL!

---

## 🔗 Useful Links

- **Render Dashboard:** https://dashboard.render.com/
- **Render Docs:** https://render.com/docs
- **PostgreSQL Docs:** https://render.com/docs/databases
- **Node.js Docs:** https://render.com/docs/deploy-node-express-app

---

## 🎉 Success!

Once deployed, your Task Manager will be:
- ✅ Live on the internet
- ✅ Free to use
- ✅ Auto-deploying from GitHub
- ✅ HTTPS secured
- ✅ Production-ready
- ✅ Portfolio-ready!

---

## 📞 Need Help?

If deployment fails:
1. Check Render logs
2. Verify environment variables
3. Test database connection
4. Check GitHub repo is accessible

---

**Ready to deploy?** Start with Step 1! 🚀

**Render:** https://render.com/
