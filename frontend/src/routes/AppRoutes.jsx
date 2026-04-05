import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Landing from '../pages/main/Landing';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/main/Dashboard';
import WorkoutPlanner from '../pages/main/WorkoutPlanner';
import Progress from '../pages/main/Progress';
import Profile from '../pages/main/Profile';
import Community from '../pages/main/Community';
import BMICalculator from '../pages/main/BMICalculator';
import ExerciseLibrary from '../pages/exercises/ExerciseLibrary';
import ExerciseDetail from '../pages/exercises/ExerciseDetail';
import Onboarding1 from '../pages/onboarding/Onboarding1';
import Onboarding2 from '../pages/onboarding/Onboarding2';
import Onboarding3 from '../pages/onboarding/Onboarding3';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Onboarding routes */}
      <Route path="/onboarding/1" element={<Onboarding1 />} />
      <Route path="/onboarding/2" element={<Onboarding2 />} />
      <Route path="/onboarding/3" element={<Onboarding3 />} />
      
      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workout-planner"
        element={
          <ProtectedRoute>
            <WorkoutPlanner />
          </ProtectedRoute>
        }
      />
      <Route
        path="/progress"
        element={
          <ProtectedRoute>
            <Progress />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/community"
        element={
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bmi-calculator"
        element={
          <ProtectedRoute>
            <BMICalculator />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exercises"
        element={
          <ProtectedRoute>
            <ExerciseLibrary />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exercise/:id"
        element={
          <ProtectedRoute>
            <ExerciseDetail />
          </ProtectedRoute>
        }
      />
      
      {/* Catch all - redirect to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
