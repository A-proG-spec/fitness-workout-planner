import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function OnboardingCheck({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Skip check if on onboarding pages or auth pages
    if (
      location.pathname.startsWith('/onboarding') ||
      location.pathname === '/login' ||
      location.pathname === '/register' ||
      location.pathname === '/'
    ) {
      return;
    }

    // If user is logged in but hasn't completed onboarding, redirect to onboarding
    if (user && !user.onboardingCompleted) {
      navigate('/onboarding/1', { replace: true });
    }
  }, [user, navigate, location.pathname]);

  return children;
}
