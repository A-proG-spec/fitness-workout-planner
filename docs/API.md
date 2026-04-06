Fitness Planner API Documentation

A comprehensive REST API for managing fitness goals, workout plans, exercises, and user progress.

Base URL

http://localhost:5000/api


Authentication

All protected routes require a JSON Web Token (JWT) provided in the request header:

Header: Authorization: Bearer <token>

Table of Contents

Health & System

Auth Endpoints

Profile Management

Exercises

Workout Plans

Progress Tracking

Admin Operations

Status Codes

Health & System

Check Server Status

GET /health

Response:

{
  "success": true,
  "message": "Server is running"
}


Auth Endpoints

Register a New User

POST /auth/register

Body:

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456",
  "gender": "Male",
  "height": 175,
  "weight": 70,
  "fitnessGoal": "Muscle Gain"
}


Login User

POST /auth/login

Body:

{
  "email": "test@example.com",
  "password": "123456"
}


Additional Auth Routes

GET /auth/me - Get current user data (Protected)

POST /auth/logout - Logout user (Protected)

Profile Management

Get User Profile

GET /profile (Protected)

Update Profile

PUT /profile (Protected)

Body:

{
  "name": "Updated User",
  "height": 180,
  "weight": 75,
  "fitnessGoal": "Weight Loss"
}


Calculate BMI

POST /profile/bmi

Body:

{
  "height": 175,
  "weight": 70
}


Exercises

GET /exercises - Get all exercises.

GET /exercises/:id - Get single exercise details.

GET /exercises/filter-options - Get available filtering options.

GET /exercises?muscleGroup=chest&difficulty=beginner - Filtered search.

Workout Plans

Create Plan

POST /plans (Protected)

Body:

{
  "workoutId": "exercise_id",
  "scheduledDate": "2024-04-20",
  "notes": "Morning workout"
}


Retrieve Plans

GET /plans - All plans.

GET /plans/daily?date=YYYY-MM-DD - Daily schedule.

GET /plans/weekly?startDate=YYYY-MM-DD - Weekly schedule.

Manage Plans

PUT /plans/:id - Update specific plan.

PUT /plans/:id/complete - Mark a workout as finished.

DELETE /plans/:id - Remove a plan.

Progress Tracking

Add Progress Entry

POST /progress (Protected)

Body:

{
  "date": "2024-04-20",
  "weight": 72.5,
  "caloriesBurned": 450,
  "notes": "Great workout!"
}


View Progress

GET /progress - History of all progress entries.

GET /progress/stats?days=30 - Analytical statistics for a specific period.

🛠 Admin Operations

Admin role required for all routes below:

GET /admin/stats - High-level dashboard statistics.

GET /admin/users - List all registered users.

PUT /admin/users/:id/role - Update user permissions.

POST /admin/exercises - Add new exercise to database.

PUT /admin/exercises/:id - Edit exercise details.

PUT /admin/exercises/:id/toggle-status - Enable/Disable an exercise.

DELETE /admin/exercises/:id - Remove exercise from database.

Status Codes

Code

Meaning

Description

200

OK

Success

201

Created

Resource created successfully

400

Bad Request

Invalid input or validation error

401

Unauthorized

Missing or invalid Bearer token

404

Not Found

Resource could not be located

Developer Notes

Environment Variables: Always use environment variables for BASE_URL and sensitive tokens.

Dates: Strictly use YYYY-MM-DD format.

IDs: All resource IDs correspond to MongoDB ObjectIds.