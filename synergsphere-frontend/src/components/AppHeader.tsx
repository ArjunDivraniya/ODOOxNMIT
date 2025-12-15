import { Bell, LogOut, Moon, Sun, User as UserIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

export default function AppHeader() {
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const dashboardHref = isAdmin ? '/admin/dashboard' : '/dashboard';
  
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to={isAuthenticated ? dashboardHref : '/'} className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-teal-500">
            <span className="font-bold text-white">SS</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            SynergySphere
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <>
              <Link to={dashboardHref} className="hidden sm:block text-sm text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <Button variant="ghost" size="icon" title="Notifications">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2 px-2 py-1 rounded-md border">
                <UserIcon className="h-4 w-4" />
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-medium">{user?.name ?? 'User'}</span>
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{user?.role}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { logout(); navigate('/'); }}
                title="Logout"
              >
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
