import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import OnboardingCheck from './components/OnboardingCheck';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OnboardingCheck>
          <AppRoutes />
        </OnboardingCheck>
      </AuthProvider>
    </BrowserRouter>
  );
}
