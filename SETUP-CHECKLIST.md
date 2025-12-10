# PetvaxHub Setup Checklist

Complete these steps to get PetvaxHub running on your system.

## ✅ Prerequisites

- [ ] Node.js installed (v16 or higher)
  - Check: `node --version`
  - Download: https://nodejs.org

- [ ] npm installed (comes with Node.js)
  - Check: `npm --version`

- [ ] MongoDB installed OR MongoDB Atlas account
  - Local: Download from https://www.mongodb.com
  - Cloud: Sign up at https://www.mongodb.com/atlas

- [ ] Python (for frontend server) OR Node.js http-server
  - Python check: `python --version`
  - OR install http-server: `npm install -g http-server`

- [ ] Code editor (VS Code recommended)

## 📦 Backend Setup

- [ ] Navigate to backend folder
  ```powershell
  cd d:\21CIS0040\petvaxhub\backend
  ```

- [ ] Install dependencies
  ```powershell
  npm install
  ```
  Wait for installation to complete (may take 2-3 minutes)

- [ ] Create .env file
  ```powershell
  copy .env.example .env
  ```

- [ ] Edit .env file with your settings
  - [ ] Set `MONGODB_URI` (local or Atlas connection string)
  - [ ] Set `JWT_SECRET` (random string, at least 32 characters)
  - [ ] Set `PORT` (5000 is default)
  - [ ] Optionally configure email settings

- [ ] Start MongoDB (if using local)
  ```powershell
  mongod
  ```
  Keep this terminal open

- [ ] Test backend (in new terminal)
  ```powershell
  cd d:\21CIS0040\petvaxhub\backend
  npm run dev
  ```
  Should see: "Server is running on port 5000" and "MongoDB Connected"

- [ ] Test API health check
  Open browser: http://localhost:5000/api/health
  Should see JSON response

## 🎨 Frontend Setup

- [ ] Navigate to frontend folder (in new terminal)
  ```powershell
  cd d:\21CIS0040\petvaxhub\frontend
  ```

- [ ] Start frontend server
  ```powershell
  python -m http.server 3000
  ```
  OR
  ```powershell
  npx http-server -p 3000
  ```

- [ ] Open in browser
  Navigate to: http://localhost:3000

- [ ] Verify home page loads
  Should see PetvaxHub logo and navigation

## 🧪 Testing

- [ ] Register a new account
  - Click "Create Account" or "Register"
  - Fill in all fields
  - Submit form
  - Should redirect to login

- [ ] Login
  - Enter email and password
  - Submit form
  - Should redirect to dashboard

- [ ] Add a pet
  - Go to dashboard
  - Click "Add New" pet
  - Fill in pet details
  - Save pet

- [ ] Add vaccination record
  - Select a pet
  - Add vaccination details
  - Save record

- [ ] View upcoming vaccinations
  - Check dashboard for upcoming vaccines

- [ ] Check vaccination schedules
  - Navigate to "Vaccination Schedules"
  - View dog and cat schedules

## 🔧 Configuration Checklist

### Backend .env
- [ ] `PORT=5000`
- [ ] `NODE_ENV=development`
- [ ] `MONGODB_URI=` (set correctly)
- [ ] `JWT_SECRET=` (random, secure string)
- [ ] `JWT_EXPIRE=7d`
- [ ] `FRONTEND_URL=http://localhost:3000`

### Frontend API
- [ ] Check `frontend/assets/js/api.js`
- [ ] `API_BASE_URL` is `http://localhost:5000/api`

## 🐛 Troubleshooting

### Backend Won't Start
- [ ] Is port 5000 already in use?
  ```powershell
  netstat -ano | findstr :5000
  ```
- [ ] Are dependencies installed? Run `npm install` again
- [ ] Is MongoDB running?
- [ ] Check .env file exists and has correct values

### Frontend Won't Load
- [ ] Is Python or http-server installed?
- [ ] Is port 3000 available?
- [ ] Try different port: `python -m http.server 8000`

### Can't Connect to MongoDB
- [ ] Local: Is mongod running?
- [ ] Cloud: Is connection string correct?
- [ ] Check network connection
- [ ] Verify credentials

### API Errors
- [ ] Is backend running?
- [ ] Check backend terminal for errors
- [ ] Open browser console (F12) for frontend errors
- [ ] Verify API_BASE_URL in frontend/assets/js/api.js

### Authentication Not Working
- [ ] Clear browser localStorage
  - F12 → Application → Local Storage → Clear
- [ ] Check JWT_SECRET is set in backend .env
- [ ] Try registering new account
- [ ] Check backend logs for errors

## 📝 Final Verification

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] MongoDB connected
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Can add pet
- [ ] Can add vaccination record
- [ ] No console errors
- [ ] All pages load correctly

## 🎉 Success!

If all checks pass, your PetvaxHub is ready to use!

## 📚 Next Steps

- [ ] Read full documentation in README.md
- [ ] Explore all features
- [ ] Customize styling in frontend/assets/css/
- [ ] Add more features as needed
- [ ] Deploy to production

## 🆘 Getting Help

If you're stuck:

1. Check error messages in:
   - Backend terminal
   - Browser console (F12)

2. Review documentation:
   - README.md
   - backend/README.md
   - frontend/README.md

3. Common fixes:
   - Restart backend server
   - Clear browser cache/localStorage
   - Reinstall dependencies: `rm -rf node_modules && npm install`
   - Check all environment variables

---

**Setup Time**: ~15-20 minutes
**Difficulty**: Beginner to Intermediate
**Support**: Check documentation files
