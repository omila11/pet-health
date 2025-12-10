# PetvaxHub Backend API

Node.js/Express backend for PetvaxHub - Smart Pet Vaccination Management System.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Install dependencies**
```bash
cd backend
npm install
```

2. **Environment Setup**
```bash
# Copy the example env file
copy .env.example .env

# Edit .env and add your configuration
```

3. **Start MongoDB** (if running locally)
```bash
mongod
```

4. **Run the server**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── petController.js     # Pet management
│   └── vaccinationController.js  # Vaccination records
├── middleware/
│   └── auth.js             # JWT authentication
├── models/
│   ├── User.js             # User schema
│   ├── Pet.js              # Pet schema
│   └── Vaccination.js      # Vaccination schema
├── routes/
│   ├── authRoutes.js       # Auth endpoints
│   ├── petRoutes.js        # Pet endpoints
│   ├── userRoutes.js       # User endpoints
│   └── vaccinationRoutes.js # Vaccination endpoints
├── utils/                   # Helper functions
├── .env.example            # Environment variables template
├── package.json            # Dependencies
└── server.js              # Entry point
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user (protected)
POST   /api/auth/logout      - Logout user (protected)
```

### Users
```
GET    /api/users/profile    - Get user profile (protected)
PUT    /api/users/profile    - Update user profile (protected)
```

### Pets
```
GET    /api/pets             - Get all user's pets (protected)
GET    /api/pets/:id         - Get single pet (protected)
POST   /api/pets             - Create new pet (protected)
PUT    /api/pets/:id         - Update pet (protected)
DELETE /api/pets/:id         - Delete pet (protected)
```

### Vaccinations
```
GET    /api/vaccinations/upcoming           - Get upcoming vaccinations (protected)
GET    /api/vaccinations/pet/:petId         - Get pet vaccinations (protected)
POST   /api/vaccinations                    - Create vaccination record (protected)
PUT    /api/vaccinations/:id                - Update vaccination (protected)
DELETE /api/vaccinations/:id                - Delete vaccination (protected)
```

### Health Check
```
GET    /api/health           - Check API status
```

## 📝 API Usage Examples

### Register User
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "mobileNumber": "1234567890"
}
```

### Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Pet (Protected)
```bash
POST http://localhost:5000/api/pets
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "Buddy",
  "species": "dog",
  "breed": "Golden Retriever",
  "dateOfBirth": "2020-05-15",
  "gender": "male",
  "weight": 30,
  "color": "Golden"
}
```

### Create Vaccination Record (Protected)
```bash
POST http://localhost:5000/api/vaccinations
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "pet": "pet_id_here",
  "vaccineName": "Rabies Vaccine",
  "vaccineType": "core",
  "administeredDate": "2024-01-15",
  "nextDueDate": "2025-01-15",
  "veterinarian": "Dr. Smith",
  "clinic": {
    "name": "Pet Care Clinic",
    "address": "123 Main St",
    "phone": "555-0123"
  },
  "status": "completed"
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

1. Register or login to receive a token
2. Include token in requests: `Authorization: Bearer YOUR_TOKEN`
3. Token expires in 7 days (configurable in .env)

## 📊 Database Models

### User
- fullName, email, password (hashed)
- mobileNumber, role, isVerified
- profileImage, timestamps

### Pet
- owner (ref to User)
- name, species, breed
- dateOfBirth, gender, weight, color
- microchipNumber, photo
- medicalHistory, isActive

### Vaccination
- pet (ref to Pet)
- vaccineName, vaccineType
- administeredDate, nextDueDate
- veterinarian, clinic info
- batchNumber, manufacturer
- certificate, status, reminderSent

## 🛠️ Development

### Run in Development Mode
```bash
npm run dev
```

### Run Tests
```bash
npm test
```

### Lint Code
```bash
npm run lint
```

## 🌍 Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/petvaxhub
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-password
FRONTEND_URL=http://localhost:3000
```

## 🚢 Deployment

### Deploy to Heroku
```bash
heroku create petvaxhub-api
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Deploy to Vercel
```bash
vercel --prod
```

## 📋 Error Handling

All API errors return consistent format:
```json
{
  "status": "error",
  "message": "Error description here"
}
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation
- CORS enabled
- Protected routes with middleware
- Role-based access control

## 📞 Support

For issues or questions, check the main README.md

## 📄 License

MIT License - See main project LICENSE file
