# 💪 Fitness Workout Planner

A web-based fitness workout planner that helps users create, customize, and track workout routines. It allows users to set goals, organize exercises, and monitor progress with a clean and intuitive experience.

---

## ✨ Features

* 🔐 Authentication (JWT-based)
* 👤 Profile management + BMI calculation
* 💪 Exercise library with filters
* 📅 Workout planning & scheduling
* ✅ Progress tracking
* 📊 Statistics & trends
* 📱 Fully responsive UI

---

## 🛠 Tech Stack

**Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT, bcryptjs

**Frontend (Planned)**

* React
* Axios
* Chart.js

---

## 📡 API Overview

**Base URL**

```
http://localhost:5000/api
```

**Auth Header (for protected routes)**

```
Authorization: Bearer <token>
```

---

## 🔐 Auth Routes

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| POST   | /auth/register | Register user |
| POST   | /auth/login    | Login         |
| POST   | /auth/refresh  | Refresh token |
| POST   | /auth/logout   | Logout        |
| GET    | /auth/me       | Current user  |

---

## 👤 Profile Routes

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| GET    | /profile     | Get profile    |
| PUT    | /profile     | Update profile |
| POST   | /profile/bmi | Calculate BMI  |

---

## 💪 Exercise Routes

| Method | Endpoint                   | Description      |
| ------ | -------------------------- | ---------------- |
| GET    | /exercises                 | Get exercises    |
| GET    | /exercises/:id             | Get one exercise |
| GET    | /exercises/filter-options  | Filters          |
| GET    | /exercises/by-muscle-group | Grouped          |
| POST   | /exercises                 | Create (Admin)   |
| PUT    | /exercises/:id             | Update (Admin)   |
| DELETE | /exercises/:id             | Delete (Admin)   |

---

## 📅 Plan Routes

| Method | Endpoint            | Description   |
| ------ | ------------------- | ------------- |
| POST   | /plans              | Create plan   |
| GET    | /plans              | Get plans     |
| GET    | /plans/daily        | Daily plans   |
| GET    | /plans/weekly       | Weekly plans  |
| PUT    | /plans/:id/complete | Mark complete |
| PUT    | /plans/:id          | Update        |
| DELETE | /plans/:id          | Delete        |

---

## 📊 Progress Routes

| Method | Endpoint        | Description |
| ------ | --------------- | ----------- |
| POST   | /progress       | Add entry   |
| GET    | /progress       | Get entries |
| GET    | /progress/stats | Statistics  |

---

## 🏥 Health

```
GET /health
```

---

## 🚀 Setup

```bash
# Install
npm install

# Run dev
npm run dev

# Production
npm start
```

Create `.env`:

```
PORT=5000
DB_URI=mongodb://localhost:27017/fitness
JWT_SECRET=your_secret
```

---

## 🧪 Test Flow

1. Register
2. Login → get token
3. Use token for protected routes
4. Create plan
5. Track progress
6. View stats

---

## 📁 Structure

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
* 500 Server Error

---

## 🔒 Auth Flow

Register → Login → Receive JWT → Access protected routes

---

## 📈 Progress Flow

Plan workouts → Complete → Log progress → View stats

---

## 🤝 Contributing

PRs are welcome. Fork → branch → commit → push → PR.

---

## 📜 License

ISC License

---

## 🚀 Quick Commands

```bash
npm run dev
npm run seed
npm start
```

---

**Status:** Active 🚀
