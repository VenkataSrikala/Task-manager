import { createContext, useState, useEffect } from 'react';
import { getToken, getUser, setToken, setUser, clearAuth } from '../utils/localStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    const savedUser = getUser();
    if (token && savedUser) {
      setUserState(savedUser);
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setToken(token);
    setUser(userData);
    setUserState(userData);
  };

  const logout = () => {
    clearAuth();
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
