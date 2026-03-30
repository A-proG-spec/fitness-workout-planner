import { createContext, useContext, useMemo, useState } from 'react';
import { clearAuth, getStoredUser, persistAuth } from '../utils/authStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());

  const login = ({ userData, accessToken, remember = true }) => {
    setUser(userData || null);
    persistAuth({ accessToken, user: userData, remember });
  };

  const logout = () => {
    setUser(null);
    clearAuth();
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
