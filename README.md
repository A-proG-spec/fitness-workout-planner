# 💪 Fitness Workout Planner

A full-stack web-based fitness workout planner that helps users create, customize, and track workout routines. Users can set goals, organize exercises, and monitor their progress through a clean and responsive interface.

---

## ✨ Features

* 🔐 JWT-based Authentication
* 👤 User Profile Management
* 🧮 BMI Calculation
* 💪 Exercise Library with Filters
* 📅 Workout Planning & Scheduling
* ✅ Progress Tracking
* 📊 Statistics & Trends
* 📱 Fully Responsive Design

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

## 📡 API Overview

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

## 💪 Exercise Routes

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

## 📊 Progress Routes

**Base Path:** `/api/progress`

| Method | Endpoint | Description              |
| ------ | -------- | ------------------------ |
| POST   | /        | Add progress entry       |
| GET    | /        | Get all progress entries |
| GET    | /stats   | Get progress statistics  |

---

## 🏥 Health Check

```
GET /health
```

---

## 🚀 Setup & Installation

### 1. Clone the repository

```
git clone https://github.com/your-username/fitness-workout-planner.git
cd fitness-workout-planner
```

### 2. Install dependencies

```
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```
PORT=5000
DB_URI=mongodb://localhost:27017/fitness
JWT_SECRET=your_secret_key
```

### 4. Run the application

**Development**

```
npm run dev
```

**Production**

```
npm start
```

---

## 🧪 Test Flow

1. Register a new user
2. Login to receive JWT token
3. Use token to access protected routes
4. Create workout plans
5. Log progress
6. View statistics

---

## 📁 Project Structure

```
backend/
 ├── models/
 ├── controllers/
 ├── routes/
 ├── middleware/
 ├── config/
 ├── utils/
 ├── app.js
 └── server.js
```

---

## 📌 Status Codes

* 200 OK
* 201 Created
* 400 Bad Request
* 401 Unauthorized
* 404 Not Found
* 500 Internal Server Error

---

## 🔒 Authentication Flow

Register → Login → Receive JWT → Access Protected Routes

---

## 📈 Progress Flow

Create Plan → Complete Workout → Log Progress → View Stats

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 📜 License

ISC License

---

## 🚀 Quick Commands

```
npm run dev
npm start
```

---

**Status:** 🚀 Active Development
