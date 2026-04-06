# 💪 HulFit - Fitness Workout Planner

A full-stack web-based fitness workout planner that helps users create, customize, and track workout routines. Users can set goals, organize exercises, and monitor their progress through a clean and responsive interface.

---

## 🚀 Features

* 🔐 JWT-based Authentication with Cookies
* 👤 User Profile Management
* 🎯 Personalized Onboarding Flow
* 🧮 BMI Calculator
* 💪 Exercise Library with Advanced Filters
* 📅 Workout Planning & Scheduling
* ✅ Progress Tracking with Charts
* 📊 Statistics & Trends Visualization
* 👥 Community Features
* 📱 Fully Responsive Design
* 🎨 Modern UI with Tailwind CSS

---

## 🛠 Tech Stack

### Backend
* Node.js & Express.js
* MongoDB Atlas (Cloud Database)
* Mongoose ODM
* JWT Authentication (httpOnly cookies)
* bcryptjs (Password hashing)
* express-validator
* CORS enabled

### Frontend
* React 18
* React Router v6
* Axios (HTTP client)
* Chart.js & react-chartjs-2
* Tailwind CSS
* Vite (Build tool)
* Context API (State management)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/your-username/fitness-workout-planner.git
cd fitness-workout-planner
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env.development.local` file:
```env
PORT=5000
NODE_ENV=development
DB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/fitness_workout_planner?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_change_this_in_production_min_32_characters
JWT_EXPIRE=7d
ACCESS_TOKEN_EXPIRE=15m
REFRESH_TOKEN_EXPIRE=7d
```

Start backend server:
```bash
npm run dev
```
Backend runs on: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend server:
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173` (or 5174, 5175)

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 📡 API Overview

**Base URL**
```
http://localhost:5000/api
```

**Authentication**
- Uses httpOnly cookies for JWT tokens
- Cookies are automatically sent with requests

---

## 🔐 Auth Routes

| Method | Endpoint       | Description           | Auth Required |
| ------ | -------------- | --------------------- | ------------- |
| POST   | /auth/register | Register new user     | No            |
| POST   | /auth/login    | Login user            | No            |
| POST   | /auth/refresh  | Refresh access token  | No            |
| POST   | /auth/logout   | Logout user           | Yes           |
| GET    | /auth/me       | Get current user data | Yes           |

---

## 👤 Profile Routes

**Base Path:** `/api/profile`

| Method | Endpoint | Description      | Auth Required |
| ------ | -------- | ---------------- | ------------- |
| GET    | /        | Get user profile | Yes           |
| PUT    | /        | Update profile   | Yes           |

**Profile Fields:**
- name, email, height, weight
- gender, dateOfBirth, fitnessGoal
- onboardingCompleted

---

## 🏋️ Exercise Routes

**Base Path:** `/api/exercises`

| Method | Endpoint         | Description            | Auth Required |
| ------ | ---------------- | ---------------------- | ------------- |
| GET    | /                | Get all exercises      | No            |
| GET    | /:id             | Get single exercise    | No            |
| GET    | /filter-options  | Get filter options     | No            |
| GET    | /by-muscle-group | Group exercises        | No            |
| GET    | /stats           | Exercise statistics    | No            |
| POST   | /                | Create exercise        | Yes           |
| PUT    | /:id             | Update exercise        | Yes           |
| DELETE | /:id             | Delete exercise        | Yes           |

---

## 📊 Progress Routes

**Base Path:** `/api/progress`

| Method | Endpoint | Description              | Auth Required |
| ------ | -------- | ------------------------ | ------------- |
| POST   | /        | Add progress entry       | Yes           |
| GET    | /        | Get all progress entries | Yes           |
| GET    | /stats   | Get progress statistics  | Yes           |

---

## 📅 Plan Routes

**Base Path:** `/api/plans`

| Method | Endpoint      | Description        | Auth Required |
| ------ | ------------- | ------------------ | ------------- |
| POST   | /             | Create plan        | Yes           |
| GET    | /             | Get all plans      | Yes           |
| GET    | /daily        | Get daily plans    | Yes           |
| GET    | /weekly       | Get weekly plans   | Yes           |
| PUT    | /:id          | Update plan        | Yes           |
| PUT    | /:id/complete | Mark plan complete | Yes           |
| DELETE | /:id          | Delete plan        | Yes           |

---

## 🧪 Testing the Application

### User Flow
1. **Register** → Create account at `/register`
2. **Onboarding** → Complete 3-step onboarding (body metrics, goals, summary)
3. **Dashboard** → View personalized dashboard
4. **Profile** → Update profile information
5. **Exercises** → Browse exercise library
6. **Progress** → Track workout progress
7. **Community** → Engage with community features

### Test Credentials
Create your own account through registration!

---

## 📁 Project Structure

**Base Path:** `/api/admin`

> ⚠️ All admin routes require authentication with an **admin role**.

### 📊 Dashboard

| Method | Endpoint | Description             |
| ------ | -------- | ----------------------- |
| GET    | /stats   | Get platform statistics |

### 👥 User Management

| Method | Endpoint              | Description      |
| ------ | --------------------- | ---------------- |
| GET    | /users                | Get all users    |
| GET    | /users/:id            | Get single user  |
| PUT    | /users/:id/role       | Update user role |
| PUT    | /users/:id/deactivate | Deactivate user  |
| PUT    | /users/:id/activate   | Activate user    |
| DELETE | /users/:id            | Delete user      |

### 🏋️ Exercise Management (Admin)

| Method | Endpoint                     | Description          |
| ------ | ---------------------------- | -------------------- |
| GET    | /exercises                   | Get all exercises    |
| POST   | /exercises                   | Create exercise      |
| PUT    | /exercises/:id               | Update exercise      |
| DELETE | /exercises/:id               | Delete exercise      |
| PUT    | /exercises/:id/toggle-status | Toggle active status |

---

## ❤️ Health Check

```
GET /api/health
```
fitness-workout-planner/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   ├── exerciseController.js
│   │   ├── planController.js
│   │   └── progressController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Exercise.js
│   │   ├── Plan.js
│   │   ├── Progress.js
│   │   └── Workout.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── exerciseRoute.js
│   │   ├── planRoutes.js
│   │   └── progressRoutes.js
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── charts/
│   │   │   ├── ui/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── OnboardingCheck.jsx
│   │   ├── config/
│   │   │   └── axios.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── layouts/
│   │   │   └── AuthLayout.jsx
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── main/
│   │   │   ├── exercises/
│   │   │   └── onboarding/
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── profileService.js
│   │   │   ├── exerciseService.js
│   │   │   └── progressService.js
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── TESTING_CHECKLIST.md
├── DEPLOYMENT_GUIDE.md
└── README.md
```

---

## 🚀 Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Quick Deployment Options:
- **Render** (Recommended for full-stack)
- **Vercel** (Frontend) + **Render** (Backend)
- **Railway** (Full-stack)

### Environment Variables for Production:

**Backend:**
```env
NODE_ENV=production
DB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_production_secret_key
```

**Frontend:**
```env
VITE_API_URL=https://your-backend-url.com/api
```

---

## 🔒 Security Features

- Passwords hashed with bcryptjs
- JWT tokens stored in httpOnly cookies
- Protected routes with authentication middleware
- CORS configured for specific origins
- Input validation with express-validator
- MongoDB injection protection with Mongoose

---

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  gender: String,
  dateOfBirth: Date,
  height: Number,
  weight: Number,
  fitnessGoal: String,
  onboardingCompleted: Boolean,
  role: String (user/admin),
  timestamps: true
}
```

### Exercise Model
```javascript
{
  name: String,
  description: String,
  muscleGroup: String,
  difficulty: String,
  equipment: String,
  category: String,
  defaultSets: Number,
  defaultReps: Number
}
```

---

## 🎨 UI Features

- Modern gradient designs
- Smooth animations and transitions
- Responsive charts with Chart.js
- Interactive exercise cards
- Real-time form validation
- Loading states and error handling
- Toast notifications
- Dark mode ready (infrastructure in place)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

ISC License

---

## 👨‍💻 Author

**Abdulaziz Ayalew**

---

## 🙏 Acknowledgments

- MongoDB Atlas for cloud database
- Chart.js for data visualization
- Tailwind CSS for styling
- React community for amazing tools

---

## 📞 Support

For issues and questions:
- Check [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md)
- Review [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- Open an issue on GitHub

---

## ⚡ Quick Commands

```bash
npm install
npm run dev
npm start
npm run seed
node scripts/createAdmin.js
```

---

## 📊 API Summary

| Category       | Endpoints |
| -------------- | --------- |
| Authentication | 5         |
| Profile        | 3         |
| Exerc          |           |
