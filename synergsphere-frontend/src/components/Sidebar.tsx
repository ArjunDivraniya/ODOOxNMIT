// src/components/Sidebar.tsx

import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderOpen, 
  CheckSquare, 
  Users, 
  Bell, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/use-auth';
import { Link, useNavigate } from 'react-router-dom';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeSection, onSectionChange, isCollapsed, setIsCollapsed }: SidebarProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLinkClick = (section: string) => {
    if (user?.role === 'admin') {
      // For admin, use state change to render content
      onSectionChange(section);
    } else {
      // For user, navigate to the user dashboard with a search param
      navigate(`/dashboard?tab=${section}`);
    }
  };

  return (
    <motion.div
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen fixed left-0 top-0 z-50 shadow-lg"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <motion.div
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="font-bold text-lg text-white">S</span>
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">SynergySphere</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Admin Dashboard</p>
              </div>
            )}
          </motion.div>
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl"
          >
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/api/placeholder/48/48" alt="Admin" />
                <AvatarFallback>
                  <User className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">Alex Johnson</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">System Admin</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                <span>Progress</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </motion.div>
        )}
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => handleLinkClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon 
                    size={20} 
                    className={`${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200'}`} 
                  />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              </motion.li>
            );
          })}
        </ul>
      </nav>
    </motion.div>
  );
}