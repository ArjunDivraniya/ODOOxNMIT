import { useState } from 'react';
import { Search, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { mockNotifications } from '@/lib/mockData';
import ProfileModal from './ProfileModal';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const unreadCount = mockNotifications.filter(n => !n.read).length;
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    await new Promise(resolve => setTimeout(resolve, 0));
    navigate('/');
  };

  const userNavigation = [
    { name: 'My Projects', path: '/dashboard' },
    { name: 'Settings', path: '/dashboard?tab=settings' },
  ];
  const adminNavigation = [
    { name: 'Admin Dashboard', path: '/admin/dashboard' },
    { name: 'My Projects', path: '/dashboard' },
    { name: 'Settings', path: '/dashboard?tab=settings' },
  ];

  const navigationItems = user?.role === 'admin' ? adminNavigation : userNavigation;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} 
                className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-teal-500">
              <span className="font-bold text-white">SS</span>
            </div>
            <span className="hidden text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent sm:inline-block">
              SynergySphere
            </span>
          </Link>

          {/* Search Bar - Only show on larger screens */}
          <div className="hidden flex-1 px-6 md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-muted pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {user && (
              <nav className="hidden md:flex items-center space-x-6 text-sm">
                {navigationItems.map((item) => (
                  <Link key={item.name} to={item.path} className="transition-colors hover:text-foreground/80">
                    {item.name}
                  </Link>
                ))}
              </nav>
            )}
          </div>
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search projects, tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            {user ? (
              <>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative">
                      <Bell className="w-5 h-5 text-gray-600" />
                      {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="end">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {mockNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b last:border-b-0 hover:bg-gray-50 ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'info' ? 'bg-blue-500' :
                              notification.type === 'warning' ? 'bg-amber-500' :
                              notification.type === 'success' ? 'bg-green-500' :
                              'bg-red-500'
                            }`} />
                            <div className="flex-1">
                              <p className="font-medium text-sm text-gray-900">{notification.title}</p>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-2">
                                {new Date(notification.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">AJ</span>
                      </div>
                      <span className="text-gray-700 font-medium">Alex Johnson</span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => setIsProfileModalOpen(true)}>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard?tab=settings'}>
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild>
                <Link to="/">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      <ProfileModal open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen} />
    </>
  );
}