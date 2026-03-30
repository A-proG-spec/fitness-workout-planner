import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/main/Landing';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/main/Dashboard';
import WorkoutPlanner from '../pages/main/WorkoutPlanner';
import Progress from '../pages/main/Progress';
import Profile from '../pages/main/Profile';
import ExerciseLibrary from '../pages/exercises/ExerciseLibrary';
import ExerciseDetail from '../pages/exercises/ExerciseDetail';
import Onboarding1 from '../pages/onboarding/Onboarding1';
import Onboarding2 from '../pages/onboarding/Onboarding2';
import Onboarding3 from '../pages/onboarding/Onboarding3';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/onboarding/1" element={<Onboarding1 />} />
      <Route path="/onboarding/2" element={<Onboarding2 />} />
      <Route path="/onboarding/3" element={<Onboarding3 />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/workout-planner" element={<WorkoutPlanner />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/exercises" element={<ExerciseLibrary />} />
      <Route path="/exercise/:id" element={<ExerciseDetail />} />
    </Routes>
  );
}
