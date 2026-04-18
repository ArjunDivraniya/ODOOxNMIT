// src/App.tsx

import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/auth-context';
import AppHeader from '@/components/AppHeader';
import AuthPage from './pages/auth/AuthPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import NotFound from './pages/NotFound';
import { ThemeProvider } from '@/components/theme-provider'; // ✅ only one
import LandingPage from './pages/LandingPage';

// Create a client
const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/dashboard" element={
      <ProtectedRoute>
        <UserDashboard />
      </ProtectedRoute>
    } />
    <Route path="/admin/dashboard" element={
      <ProtectedRoute adminOnly>
        <AdminDashboard />
      </ProtectedRoute>
    } />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const AppLayout = () => {
  const location = useLocation();
  const hideHeader = location.pathname === '/' || location.pathname === '/auth';

  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeader && <AppHeader />}
      <main className="flex-1">
        <AppRoutes />
      </main>
    </div>
  );
};

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
