import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

export type User = {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
};

type StoredAuth = {
  user: User;
  token: string;
  expiresAt: number; // epoch ms
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  expiresAt: number | null;
  login: (userData: User, token: string, options?: { remember?: boolean; ttlDays?: number }) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  getAuthHeader: () => Record<string, string>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  // Check for existing session on initial load
  useEffect(() => {
    const raw = localStorage.getItem('auth') || sessionStorage.getItem('auth');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as StoredAuth;
      if (parsed.expiresAt && parsed.expiresAt > Date.now()) {
        setUser(parsed.user);
        setToken(parsed.token);
        setExpiresAt(parsed.expiresAt);
      } else {
        localStorage.removeItem('auth');
        sessionStorage.removeItem('auth');
      }
    } catch {
      localStorage.removeItem('auth');
      sessionStorage.removeItem('auth');
    }
  }, []);

  const login = useCallback((userData: User, jwtToken: string, options?: { remember?: boolean; ttlDays?: number }) => {
    const ttlDays = options?.ttlDays ?? 7;
    const expiresAt = Date.now() + ttlDays * 24 * 60 * 60 * 1000;
    const payload: StoredAuth = { user: userData, token: jwtToken, expiresAt };
    setUser(userData);
    setToken(jwtToken);
    setExpiresAt(expiresAt);
    const storage = options?.remember === false ? sessionStorage : localStorage;
    storage.setItem('auth', JSON.stringify(payload));
    // ensure other storage is cleared to avoid conflicts
    (storage === localStorage ? sessionStorage : localStorage).removeItem('auth');
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setExpiresAt(null);
    localStorage.removeItem('auth');
    sessionStorage.removeItem('auth');
    // Don't navigate here, let the component handle it
  }, []);

  const value = {
    user,
    token,
    expiresAt,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    getAuthHeader: () => (token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
