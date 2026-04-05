# 🏋️ Fitness Workout Planner

A full-stack web-based fitness workout planner that helps users create, customize, and track workout routines. Users can set goals, organize exercises, and monitor their progress through a clean and responsive interface.

---

## 🚀 Features

* JWT-based Authentication
* User Profile Management
* BMI Calculation
* Exercise Library with Filters
* Workout Planning and Scheduling
* Progress Tracking
* Statistics and Trends
* Admin Dashboard and Management
* Fully Responsive Design

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (Authentication)
* bcryptjs (Password hashing)
* express-validator

### Frontend (Planned)

* React
* Axios
* Chart.js

---

## 🌐 API Overview

**Base URL**

```
http://localhost:5000/api
```

**Auth Header (Protected Routes)**

```
Authorization: Bearer <token>
```

---

## 🔐 Auth Routes

| Method | Endpoint       | Description      |
| ------ | -------------- | ---------------- |
| POST   | /auth/register | Register user    |
| POST   | /auth/login    | Login user       |
| POST   | /auth/refresh  | Refresh token    |
| POST   | /auth/logout   | Logout user      |
| GET    | /auth/me       | Get current user |

---

## 👤 Profile Routes

**Base Path:** `/api/profile`

| Method | Endpoint | Description      |
| ------ | -------- | ---------------- |
| GET    | /        | Get user profile |
| PUT    | /        | Update profile   |
| POST   | /bmi     | Calculate BMI    |

---

## 🏋️ Exercise Routes

**Base Path:** `/api/exercises`

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| GET    | /                | Get all exercises      |
| GET    | /:id             | Get single exercise    |
| GET    | /filter-options  | Get filter options     |
| GET    | /by-muscle-group | Group exercises        |
| GET    | /stats           | Exercise statistics    |
| POST   | /                | Create exercise (Auth) |
| PUT    | /:id             | Update exercise (Auth) |
| DELETE | /:id             | Delete exercise (Auth) |

---

## 📅 Plan Routes

**Base Path:** `/api/plans`

| Method | Endpoint      | Description        |
| ------ | ------------- | ------------------ |
| POST   | /             | Create plan        |
| GET    | /             | Get all plans      |
| GET    | /daily        | Get daily plans    |
| GET    | /weekly       | Get weekly plans   |
| PUT    | /:id          | Update plan        |
| PUT    | /:id/complete | Mark plan complete |
| DELETE | /:id          | Delete plan        |

---

## 📈 Progress Routes

**Base Path:** `/api/progress`

| Method | Endpoint | Description              |
| ------ | -------- | ------------------------ |
| POST   | /        | Add progress entry       |
| GET    | /        | Get all progress entries |
| GET    | /stats   | Get progress statistics  |

---

## 🛡 Admin Routes

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

---

## 📊 Admin Dashboard Response Example

```json
{
  "success": true,
  "data": {
    "users": {
      "total": 245,
      "active": 210,
      "inactive": 35
    },
    "exercises": {
      "total": 156,
      "active": 142,
      "inactive": 14
    },
    "plans": {
      "total": 5678,
      "completed": 4145,
      "completionRate": 73
    },
    "progress": {
      "totalEntries": 1234
    },
    "recentUsers": [],
    "recentPlans": []
  }
}
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/fitness-workout-planner.git
cd fitness-workout-planner
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
DB_URI=mongodb://localhost:27017/fitness_workout_planner
JWT_SECRET=your_super_secret_key_min_32_characters
JWT_EXPIRE=7d
```

### 4. Create Admin User (Optional)

```bash
node scripts/createAdmin.js
```

**Default Credentials:**

* Email: [admin@fitness.com](mailto:admin@fitness.com)
* Password: Admin@123456

### 5. Run the application

**Development**

```bash
npm run dev
```

**Production**

```bash
npm start
```

---

## 🔄 Flows

### Regular User Flow

1. Register
2. Login → Receive JWT
3. Browse exercises
4. Create workout plans
5. Complete workouts
6. Log progress
7. View stats

### Admin Flow

1. Login as admin
2. Access dashboard
3. Manage users
4. Manage exercises
5. Monitor platform

---

## 🗂 Project Structure

```
backend/
├── config/
├── models/
├── controllers/
├── routes/
├── middleware/
├── utils/
├── scripts/
├── app.js
└── server.js
```

---

## 📌 Status Codes

| Code | Meaning      |
| ---- | ------------ |
| 200  | Success      |
| 201  | Created      |
| 400  | Bad Request  |
| 401  | Unauthorized |
| 403  | Forbidden    |
| 404  | Not Found    |
| 409  | Conflict     |
| 500  | Server Error |

---

## 🔐 Security

* Password hashing (bcrypt)
* JWT authentication
* Role-based access control
* Input validation
* Protected routes
* Environment variables

---

## 👥 Roles

| Role  | Permissions |
| ----- | ----------- |
| User  | Basic usage |
| Admin | Full access |

---

## 🤝 Contributing

1. Fork repo
2. Create branch (`feature/your-feature`)
3. Commit changes
4. Push
5. Open PR

---

## 📜 License

ISC License

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
