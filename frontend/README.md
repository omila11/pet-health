# PetvaxHub Frontend

Client-side application for PetvaxHub pet vaccination management system.

## 📁 Structure

```
frontend/
├── index.html                      # Home/Landing page
├── pages/                          # All application pages
│   ├── login.html                 # User login
│   ├── register.html              # User registration
│   ├── dashboard.html             # Main dashboard
│   ├── vaccineplan.html           # Vaccination schedules
│   └── contact.html               # Contact form
└── assets/
    ├── css/                       # Stylesheets
    │   ├── main.css              # Global styles
    │   ├── login.css
    │   ├── register.css
    │   ├── dashboard.css
    │   ├── vaccineplan.css
    │   └── contact.css
    ├── js/                        # JavaScript files
    │   ├── api.js                # API client
    │   ├── script.js             # Main JS
    │   ├── login.js              # Login logic
    │   ├── register.js           # Registration logic
    │   └── dashboard.js          # Dashboard logic
    └── images/                    # Image assets
        └── *.jpg                 # All images
```

## 🚀 Running the Frontend

### Option 1: Python Server (Recommended)
```bash
cd frontend
python -m http.server 3000
```

### Option 2: Node.js http-server
```bash
cd frontend
npx http-server -p 3000
```

### Option 3: VS Code Live Server
- Install "Live Server" extension
- Right-click index.html
- Select "Open with Live Server"

Access at: http://localhost:3000

## 🔗 API Integration

The frontend connects to the backend API. Update the API URL in `assets/js/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

For production, change to your deployed backend URL.

## 🎨 Pages

### Home (index.html)
- Welcome message
- Feature overview
- Call to action (Register)

### Login (pages/login.html)
- Email/password form
- API integration
- Redirects to dashboard on success

### Register (pages/register.html)
- Full registration form
- Input validation
- Creates user account via API

### Dashboard (pages/dashboard.html)
- View all pets
- View upcoming vaccinations
- Add/edit/delete pets
- **Requires authentication**

### Vaccination Plans (pages/vaccineplan.html)
- Dog vaccination schedule
- Cat vaccination schedule
- Core and non-core vaccines

### Contact (pages/contact.html)
- Contact form
- Support information

## 🔐 Authentication

The app uses JWT tokens stored in localStorage:

```javascript
// Check if user is logged in
if (isAuthenticated()) {
    // User is logged in
}

// Logout
logoutUser(); // Clears token and redirects
```

## 📱 Features

- Responsive design
- Form validation
- Error handling
- Loading states
- Token-based authentication
- API integration
- Dynamic content loading

## 🎯 User Flow

1. **New User**: Home → Register → Login → Dashboard
2. **Returning User**: Home → Login → Dashboard
3. **View Info**: Home → Vaccination Plans

## 🛠️ Customization

### Change Colors
Edit `assets/css/main.css` for global styles

### Add Pages
1. Create HTML file in `pages/`
2. Copy header/nav from existing page
3. Update paths to use `../assets/`
4. Create corresponding CSS in `assets/css/`
5. Add navigation link

### Add Features
Create new JS files in `assets/js/` and include in HTML:
```html
<script src="../assets/js/yourfile.js"></script>
```

## 🌐 Deployment

### Netlify
1. Drag and drop `frontend` folder
2. Or connect Git repository
3. Update API_BASE_URL to production backend

### Vercel
```bash
cd frontend
vercel --prod
```

### GitHub Pages
1. Push frontend folder to GitHub
2. Enable Pages in settings
3. Select folder as source

## 📝 Notes

- All protected pages check authentication
- Redirects to login if not authenticated
- API calls include JWT token automatically
- LocalStorage used for token persistence

## 🐛 Common Issues

**Images not loading**: Check paths use `../assets/images/`
**API errors**: Verify backend is running and CORS is configured
**Not redirecting after login**: Check browser console for errors

---

For backend documentation, see `../backend/README.md`
