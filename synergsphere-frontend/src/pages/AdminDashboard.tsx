import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, CheckCircle, AlertCircle, LayoutDashboard, FolderOpen, CheckSquare, Bell, BarChart3, Settings as SettingsIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '@/components/Sidebar';
import ProjectManagement from '@/components/ProjectManagement';
import TaskManagement from '@/components/TaskManagement';
import UserManagement from '../components/UserManagement';
import NotificationsCenter from '@/components/NotificationsCenter';
import SettingsComponent from '@/components/Settings';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import ReportsPage from '@/components/ReportsPage';
import { dashboardApi } from '@/services/api';

type DashboardStats = {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  totalUsers: number;
  taskStatusData: Array<{ name: string; value: number }>;
  projectData: Array<{ id: string; name: string; members: number; progress: number }>;
};

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444'];

const AdminDashboardOverview = ({ stats }: { stats: DashboardStats }) => {
  const statsCards = useMemo(() => [
    {
      title: 'Total Projects',
      value: stats.totalProjects.toString(),
      subtitle: `${stats.activeProjects} active`,
      icon: TrendingUp,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Team Members',
      value: stats.totalUsers.toString(),
      subtitle: 'Registered users',
      icon: Users,
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600',
    },
    {
      title: 'Completed Tasks',
      value: stats.completedTasks.toString(),
      subtitle: `${stats.totalTasks} total`,
      icon: CheckCircle,
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'In Progress',
      value: stats.inProgressTasks.toString(),
      subtitle: 'Active execution',
      icon: AlertCircle,
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      iconColor: 'text-amber-600',
    },
  ], [stats]);

  const projectCompletionData = useMemo(() => [
    { name: 'Completed', value: stats.completedProjects },
    { name: 'Active', value: stats.activeProjects },
  ], [stats]);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-2">{stat.subtitle}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Completion Split</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={projectCompletionData} cx="50%" cy="50%" outerRadius={95} dataKey="value" label>
                  {projectCompletionData.map((entry, index) => (
                    <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.taskStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Team & Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={stats.projectData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="members" fill="#8B5CF6" radius={4} />
              <Bar dataKey="progress" fill="#10B981" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    totalUsers: 0,
    taskStatusData: [],
    projectData: [],
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await dashboardApi.getAdminStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
      }
    };

    if (user?.role === 'admin') {
      loadStats();
    }
  }, [user?.role]);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboardOverview stats={stats} />;
      case 'projects':
        return <ProjectManagement />;
      case 'tasks':
        return <TaskManagement />;
      case 'users':
        return <UserManagement />;
      case 'notifications':
        return <NotificationsCenter />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsComponent />;
      default:
        return <AdminDashboardOverview stats={stats} />;
    }
  };

  if (user?.role !== 'admin') {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div
        className={`flex-1 overflow-x-hidden transition-all duration-300 ${isCollapsed ? 'ml-[80px]' : 'ml-[280px]'}`}
      >
        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
