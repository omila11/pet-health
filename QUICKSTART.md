# PetvaxHub - Quick Reference Card

## 🚀 Start Commands

### Backend
```bash
cd backend
npm install                # First time only
npm run dev               # Development mode
npm start                 # Production mode
```
**Runs on**: http://localhost:5000

### Frontend
```bash
cd frontend
python -m http.server 3000       # Python
# OR
npx http-server -p 3000          # Node.js
```
**Runs on**: http://localhost:3000

## 📋 Environment Setup

1. Copy `backend/.env.example` to `backend/.env`
2. Set these variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/petvaxhub
   JWT_SECRET=your-random-secret-key
   PORT=5000
   ```
3. Install MongoDB or use MongoDB Atlas

## 🔗 Main URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 📁 Key Directories

```
petvaxhub/
├── frontend/          # HTML, CSS, JS (client)
│   ├── pages/        # HTML pages
│   └── assets/       # CSS, JS, images
└── backend/          # Node.js API (server)
    ├── models/       # Database schemas
    ├── controllers/  # Business logic
    ├── routes/       # API endpoints
    └── middleware/   # Authentication
```

## 🔐 Authentication Flow

1. **Register**: POST `/api/auth/register`
2. **Login**: POST `/api/auth/login` → Receive token
3. **Use Token**: Add to requests: `Authorization: Bearer TOKEN`
4. **Logout**: Clear token from localStorage

## 📡 Common API Calls

```javascript
// Register
POST /api/auth/register
Body: { fullName, email, password, mobileNumber }

// Login
POST /api/auth/login
Body: { email, password }

// Get Pets
GET /api/pets
Headers: Authorization: Bearer YOUR_TOKEN

// Add Pet
POST /api/pets
Headers: Authorization: Bearer YOUR_TOKEN
Body: { name, species, breed, dateOfBirth, gender }

// Add Vaccination
POST /api/vaccinations
Headers: Authorization: Bearer YOUR_TOKEN
Body: { pet, vaccineName, administeredDate, nextDueDate, ... }
```

## 🛠️ Common Tasks

### Install Dependencies
```bash
cd backend
npm install
```

### Reset Database
```bash
# Drop database in MongoDB
mongo
use petvaxhub
db.dropDatabase()
```

### Check Logs
- **Backend**: Terminal output
- **Frontend**: Browser Console (F12)

### Update API URL
Edit `frontend/assets/js/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend won't start | Check if port 5000 is free |
| Can't connect to MongoDB | Start MongoDB: `mongod` |
| Frontend API errors | Check backend is running |
| Login not working | Clear localStorage, check JWT_SECRET |
| CORS errors | Check backend CORS settings |

## 📦 Dependencies

### Backend
- express
- mongoose
- jsonwebtoken
- bcryptjs
- dotenv
- cors

### Frontend
- No dependencies (vanilla JS)

## 🎯 User Flow

1. Home → Register → Login
2. Dashboard → Add Pet → Add Vaccination
3. View upcoming vaccinations
4. Browse vaccination schedules

## 📊 Database Collections

- **users**: User accounts
- **pets**: Pet profiles
- **vaccinations**: Vaccination records

## 🌐 Deploy

### Frontend
- Netlify: Drag & drop `frontend` folder
- Vercel: `cd frontend && vercel --prod`
- GitHub Pages: Push to repo, enable Pages

### Backend
- Heroku: `git push heroku main`
- Railway: Connect GitHub repo
- Digital Ocean: Deploy Node.js app

## 📚 Documentation

- `README.md` - Quick start guide
- `PROJECT-OVERVIEW.md` - Complete structure
- `frontend/README.md` - Frontend details
- `backend/README.md` - API documentation

## ⚡ Quick Tips

- Backend must run before frontend can work
- MongoDB must be running for backend
- Tokens expire after 7 days (default)
- All `/api/` routes except auth require token
- Use browser DevTools for frontend debugging
- Check terminal for backend errors

---

**Need help?** Check the full README.md files in each directory.
