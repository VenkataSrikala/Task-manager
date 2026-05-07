# 🚀 Deploy from Terminal (CLI)

Deploy your Task Manager directly from the command line!

---

## Option 1: Vercel CLI (Easiest & Free)

### Step 1: Install Vercel CLI

```powershell
npm install -g vercel
```

### Step 2: Login to Vercel

```powershell
vercel login
```

This will open your browser to authenticate.

### Step 3: Deploy Backend

```powershell
cd backend

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? taskmanager-backend
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add DATABASE_URL
# Paste your database URL when prompted

vercel env add JWT_SECRET
# Paste your JWT secret

vercel env add NODE_ENV
# Type: production

# Deploy to production
vercel --prod
```

Your backend is live! Copy the URL.

### Step 4: Deploy Frontend

```powershell
cd ../frontend

# Deploy
vercel

# Follow prompts:
# - Project name? taskmanager-frontend
# - Framework? Vite

# Add environment variable
vercel env add VITE_API_URL
# Paste: https://your-backend.vercel.app/api

# Deploy to production
vercel --prod
```

Done! Your app is live! 🎉

---

## Option 2: Railway CLI

### Step 1: Install Railway CLI

```powershell
# Windows (PowerShell)
iwr https://railway.app/install.ps1 | iex

# Or with npm
npm install -g @railway/cli
```

### Step 2: Login

```powershell
railway login
```

Browser will open for authentication.

### Step 3: Initialize Project

```powershell
# Create new project
railway init

# Link to existing project (if you created one on web)
railway link
```

### Step 4: Add PostgreSQL Database

```powershell
railway add --database postgres
```

### Step 5: Deploy Backend

```powershell
cd backend

# Set environment variables
railway variables set JWT_SECRET="your-secret-key-here"
railway variables set NODE_ENV="production"
railway variables set PORT="5000"

# Deploy
railway up

# Get the URL
railway domain
```

### Step 6: Deploy Frontend

```powershell
cd ../frontend

# Create new service
railway init

# Set environment variable
railway variables set VITE_API_URL="https://your-backend.railway.app/api"

# Deploy
railway up

# Get the URL
railway domain
```

Done! 🎉

---

## Option 3: Render CLI

### Step 1: Install Render CLI

```powershell
npm install -g render-cli
```

### Step 2: Login

```powershell
render login
```

### Step 3: Create render.yaml

Already created! Just use the existing configuration.

### Step 4: Deploy

```powershell
# Deploy everything
render deploy

# Or deploy specific service
render deploy --service backend
render deploy --service frontend
```

---

## Option 4: Netlify CLI (Frontend Only)

### Step 1: Install Netlify CLI

```powershell
npm install -g netlify-cli
```

### Step 2: Login

```powershell
netlify login
```

### Step 3: Deploy Frontend

```powershell
cd frontend

# Initialize
netlify init

# Build
npm run build

# Deploy
netlify deploy --prod

# Set environment variable
netlify env:set VITE_API_URL "https://your-backend-url/api"
```

---

## 🎯 Recommended: Vercel CLI

**Why?**
- ✅ Easiest to use
- ✅ 100% free
- ✅ Fast deployment
- ✅ Great for both frontend and backend

### Quick Deploy Script:

```powershell
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy backend
cd backend
vercel --prod

# Deploy frontend
cd ../frontend
vercel --prod
```

---

## 📋 Complete Vercel CLI Deployment

### One-Time Setup:

```powershell
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Go to your project
cd C:\Users\Pardha Saradhi\Desktop\task-sri
```

### Deploy Backend:

```powershell
# Navigate to backend
cd backend

# First deployment (interactive)
vercel

# Answer prompts:
# Set up and deploy? Y
# Which scope? (select your account)
# Link to existing project? N
# What's your project's name? taskmanager-backend
# In which directory is your code located? ./
# Want to override the settings? N

# Add environment variables
vercel env add DATABASE_URL production
# Paste your Supabase/Render database URL

vercel env add JWT_SECRET production
# Type a strong random string

vercel env add NODE_ENV production
# Type: production

# Deploy to production
vercel --prod

# Copy the production URL!
```

### Deploy Frontend:

```powershell
# Navigate to frontend
cd ../frontend

# First deployment
vercel

# Answer prompts:
# Project name? taskmanager-frontend
# Framework? Vite

# Add environment variable
vercel env add VITE_API_URL production
# Paste: https://your-backend-url.vercel.app/api

# Deploy to production
vercel --prod

# Your app is live!
```

---

## 🔄 Update Deployment

After making changes:

```powershell
# Commit changes
git add .
git commit -m "Update feature"
git push

# Redeploy backend
cd backend
vercel --prod

# Redeploy frontend
cd frontend
vercel --prod
```

Or just push to GitHub - Vercel auto-deploys! ✅

---

## 📊 CLI Commands Reference

### Vercel:
```powershell
vercel                    # Deploy to preview
vercel --prod            # Deploy to production
vercel env ls            # List environment variables
vercel env add KEY       # Add environment variable
vercel env rm KEY        # Remove environment variable
vercel logs              # View logs
vercel domains           # Manage domains
vercel ls                # List deployments
vercel rm                # Remove deployment
```

### Railway:
```powershell
railway init             # Initialize project
railway up               # Deploy
railway link             # Link to project
railway add              # Add service/database
railway variables        # Manage variables
railway logs             # View logs
railway domain           # Get domain
railway status           # Check status
```

### Netlify:
```powershell
netlify init             # Initialize
netlify deploy           # Deploy preview
netlify deploy --prod    # Deploy production
netlify env:set KEY VAL  # Set environment variable
netlify env:list         # List variables
netlify open             # Open in browser
netlify logs             # View logs
```

---

## 🚨 Troubleshooting

### "Command not found"
```powershell
# Reinstall CLI
npm install -g vercel

# Or add to PATH
# Windows: Add npm global folder to PATH
```

### "Authentication failed"
```powershell
# Re-login
vercel logout
vercel login
```

### "Build failed"
```powershell
# Check logs
vercel logs

# Test build locally
npm run build
```

---

## 🎯 Quick Start (Copy-Paste)

### Complete Vercel Deployment:

```powershell
# Install CLI
npm install -g vercel

# Login
vercel login

# Deploy backend
cd backend
vercel --prod
# Add environment variables when prompted

# Deploy frontend  
cd ../frontend
vercel --prod
# Add VITE_API_URL when prompted

# Done! 🎉
```

---

## 💡 Pro Tips

### 1. Save Deployment Config
Create `vercel.json` in each folder:

**backend/vercel.json:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.js"
    }
  ]
}
```

**frontend/vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### 2. Auto-Deploy from GitHub
Link your GitHub repo in Vercel dashboard - auto-deploys on push!

### 3. Environment Variables
Store in `.env.production` locally, then:
```powershell
vercel env pull
```

---

## 🎉 Success!

Your app is now deployed from terminal! 🚀

**Vercel Dashboard:** https://vercel.com/dashboard  
**Railway Dashboard:** https://railway.app/dashboard  
**Netlify Dashboard:** https://app.netlify.com/

---

## 📞 Need Help?

Check CLI documentation:
- **Vercel:** https://vercel.com/docs/cli
- **Railway:** https://docs.railway.app/develop/cli
- **Netlify:** https://docs.netlify.com/cli/get-started/

---

**Ready to deploy from terminal?** Start with Vercel CLI! 🚀
