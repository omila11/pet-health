# PetvaxHub - Full Stack Pet Vaccination Management System

A complete web application with frontend and backend for managing pet vaccination records.

## 🚀 Quick Start Guide

### 1. Backend Setup

```powershell
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Edit .env and set your MongoDB URI and JWT secret

# Start the server
npm run dev
```

Backend runs on: **http://localhost:5000**

### 2. Frontend Setup

```powershell
# Navigate to frontend
cd frontend

# Start a local server
python -m http.server 3000
```

Frontend runs on: **http://localhost:3000**

### 3. First Use

1. Open http://localhost:3000
2. Click "Create Account" to register
3. Login with your credentials
4. Add your pets and vaccination records

## 📁 Project Structure

```
petvaxhub/
├── frontend/              # Client application
│   ├── index.html        # Home page
│   ├── pages/            # All pages
│   └── assets/           # CSS, JS, images
│
├── backend/               # Server application
│   ├── server.js         # Entry point
│   ├── models/           # Database schemas
│   ├── controllers/      # Business logic
│   ├── routes/           # API endpoints
│   └── middleware/       # Auth & validation
│
└── README.md             # This file
```

## 🎯 Key Features

- ✅ User authentication (register/login)
- ✅ Pet management (add, edit, delete)
- ✅ Vaccination tracking
- ✅ Upcoming vaccination reminders
- ✅ Complete vaccination schedules
- ✅ RESTful API

## 🛠️ Tech Stack

**Frontend**: HTML, CSS, JavaScript
**Backend**: Node.js, Express, MongoDB
**Auth**: JWT tokens
**Database**: MongoDB with Mongoose

## 📖 Documentation

- **Backend API**: See `backend/README.md`
- **Environment Setup**: See `backend/.env.example`

## 🔗 API Endpoints

Base URL: `http://localhost:5000/api`

- `POST /auth/register` - Register user
- `POST /auth/login` - Login user
- `GET /pets` - Get all pets
- `POST /pets` - Add new pet
- `GET /vaccinations/upcoming` - Get upcoming vaccinations
- `POST /vaccinations` - Add vaccination record

Full API documentation in `backend/README.md`

## 🌐 Deployment

**Frontend**: Deploy to Netlify, Vercel, or GitHub Pages
**Backend**: Deploy to Heroku, Railway, or Digital Ocean

## 📝 Development

```bash
# Backend (with auto-reload)
cd backend && npm run dev

# Frontend (any static server)
cd frontend && python -m http.server 3000
```

## 🐛 Troubleshooting

**Can't connect to MongoDB?**
- Check if MongoDB is running
- Verify MONGODB_URI in backend/.env

**Frontend can't reach backend?**
- Ensure backend is running on port 5000
- Check CORS settings

**Login not working?**
- Clear browser localStorage
- Check JWT_SECRET is set in .env

## 📞 Support

Check the console logs (browser F12 and backend terminal) for error messages.

---

**Status**: Production Ready ✅
**Version**: 1.0.0
**Date**: December 10, 2025
