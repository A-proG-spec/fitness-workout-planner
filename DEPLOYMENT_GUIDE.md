# HulFit Deployment Guide

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account
- Git installed
- Hosting platform account (Vercel, Netlify, Render, etc.)

## 🗄️ MongoDB Atlas Setup (Already Done)

✅ Your MongoDB Atlas is configured:
- **Cluster**: cluster0.afoacf3.mongodb.net
- **Database**: fitness_workout_planner
- **Username**: AbdulazizAya
- **Password**: 3UXtWhs72.beL68

## 🚀 Deployment Options

### Option 1: Deploy to Render (Recommended for Full-Stack)

#### Backend Deployment

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Backend Service**
   ```
   Name: hulfit-backend
   Region: Choose closest to you
   Branch: AbdulazizA (or main)
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   ```
   PORT=5000
   NODE_ENV=production
   DB_URI=mongodb+srv://AbdulazizAya:3UXtWhs72.beL68@cluster0.afoacf3.mongodb.net/fitness_workout_planner?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=your_super_secret_key_change_this_in_production_min_32_characters_long_for_security
   JWT_EXPIRE=7d
   ACCESS_TOKEN_EXPIRE=15m
   REFRESH_TOKEN_EXPIRE=7d
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note your backend URL: `https://hulfit-backend.onrender.com`

#### Frontend Deployment

1. **Update Frontend Environment**
   - Create `frontend/.env.production`:
   ```
   VITE_API_URL=https://hulfit-backend.onrender.com/api
   ```

2. **Create New Static Site**
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

3. **Configure Frontend Service**
   ```
   Name: hulfit-frontend
   Branch: AbdulazizA (or main)
   Root Directory: frontend
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

4. **Add Environment Variable**
   ```
   VITE_API_URL=https://hulfit-backend.onrender.com/api
   ```

5. **Deploy**
   - Click "Create Static Site"
   - Your app will be live at: `https://hulfit-frontend.onrender.com`

6. **Update Backend CORS**
   - Add your frontend URL to backend CORS origins
   - In `backend/app.js`:
   ```javascript
   origin: [
     'http://localhost:3000',
     'http://localhost:5173',
     'http://localhost:5174',
     'https://hulfit-frontend.onrender.com'
   ]
   ```
   - Commit and push changes

---

### Option 2: Deploy to Vercel (Frontend) + Render (Backend)

#### Backend on Render
- Follow steps above for Render backend deployment

#### Frontend on Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy Frontend**
   ```bash
   cd frontend
   vercel
   ```

4. **Configure Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add:
   ```
   VITE_API_URL=https://hulfit-backend.onrender.com/api
   ```

5. **Redeploy**
   ```bash
   vercel --prod
   ```

---

### Option 3: Deploy to Railway (Full-Stack)

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add Backend Service**
   - Click "Add Service" → "GitHub Repo"
   - Root Directory: `backend`
   - Add environment variables (same as Render)

4. **Add Frontend Service**
   - Click "Add Service" → "GitHub Repo"
   - Root Directory: `frontend`
   - Add environment variable: `VITE_API_URL`

5. **Configure Domains**
   - Railway provides automatic domains
   - Update CORS with frontend domain

---

## 🔧 Post-Deployment Configuration

### 1. Update CORS Origins
After deployment, update `backend/app.js`:
```javascript
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:5174',
        'https://your-frontend-domain.com'  // Add your deployed frontend URL
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 2. Test Deployed Application
- Register a new user
- Complete onboarding
- Test all features
- Check MongoDB Atlas for data

### 3. Monitor Application
- Check backend logs for errors
- Monitor MongoDB Atlas metrics
- Set up error tracking (optional: Sentry)

---

## 📝 Environment Variables Summary

### Backend (.env.production)
```env
PORT=5000
NODE_ENV=production
DB_URI=mongodb+srv://AbdulazizAya:3UXtWhs72.beL68@cluster0.afoacf3.mongodb.net/fitness_workout_planner?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_super_secret_key_change_this_in_production_min_32_characters_long_for_security
JWT_EXPIRE=7d
ACCESS_TOKEN_EXPIRE=15m
REFRESH_TOKEN_EXPIRE=7d
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-url.com/api
```

---

## 🐛 Troubleshooting

### CORS Errors
- Ensure frontend URL is in backend CORS origins
- Check that `credentials: true` is set in both frontend axios and backend CORS

### MongoDB Connection Issues
- Verify MongoDB Atlas IP whitelist (should be 0.0.0.0/0 for cloud deployment)
- Check connection string is correct
- Ensure database user has proper permissions

### 401 Unauthorized Errors
- Check JWT_SECRET is set correctly
- Verify cookies are being sent (withCredentials: true)
- Check token expiration time

### Build Errors
- Run `npm run build` locally first
- Check all dependencies are in package.json
- Verify Node version compatibility

---

## 🎉 Success Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] MongoDB Atlas connected
- [ ] User registration works
- [ ] Login works
- [ ] Onboarding flow works
- [ ] Dashboard displays user data
- [ ] Profile updates work
- [ ] All protected routes work
- [ ] Logout works

---

## 📞 Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints directly
4. Check MongoDB Atlas connection
5. Review CORS configuration

Your app is ready to deploy! 🚀
