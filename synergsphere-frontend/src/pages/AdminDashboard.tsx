// src/pages/AdminDashboard.tsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, CheckCircle, AlertCircle, Calendar, Target, LayoutDashboard, FolderOpen, CheckSquare, Bell, BarChart3, Settings as SettingsIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProjectManagement from '@/components/ProjectManagement';
import TaskManagement from '@/components/TaskManagement';
import UserManagement from '../components/UserManagement';
import NotificationsCenter from '@/components/NotificationsCenter';
import SettingsComponent from '@/components/Settings';
import { dashboardStats } from '@/lib/mockData';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import ReportsPage from '@/components/ReportsPage';

const statsCards = [
  {
    title: 'Total Projects',
    value: dashboardStats.totalProjects.toString(),
    change: '+12%',
    icon: Target,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    title: 'Active Users',
    value: dashboardStats.activeUsers.toString(),
    change: '+8%',
    icon: Users,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  {
    title: 'Completed Tasks',
    value: dashboardStats.completedTasks.toString(),
    change: '-23%',
    icon: CheckCircle,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20'
  },
  {
    title: 'In Progress Tasks',
    value: dashboardStats.inProgressTasks.toString(),
    change: '+5%',
    icon: AlertCircle,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  }
];

const projectData = [
  { name: 'Completed', value: 65, color: '#10B981' },
  { name: 'In Progress', value: 25, color: '#3B82F6' },
  { name: 'Pending', value: 10, color: '#F59E0B' }
];

const weeklyData = [
  { name: 'Mon', tasks: 12, completed: 8 },
  { name: 'Tue', tasks: 15, completed: 12 },
  { name: 'Wed', tasks: 18, completed: 14 },
  { name: 'Thu', tasks: 22, completed: 18 },
  { name: 'Fri', tasks: 20, completed: 16 },
  { name: 'Sat', tasks: 8, completed: 6 },
  { name: 'Sun', tasks: 5, completed: 4 }
];

const progressData = [
  { month: 'Jan', progress: 65 },
  { month: 'Feb', progress: 70 },
  { month: 'Mar', progress: 75 },
  { month: 'Apr', progress: 80 },
  { month: 'May', progress: 85 },
  { month: 'Jun', progress: 88 }
];

const upcomingDeadlines = [
  { project: 'Mobile App Redesign', deadline: '2 days', priority: 'high' },
  { project: 'Website Optimization', deadline: '5 days', priority: 'medium' },
  { project: 'API Integration', deadline: '1 week', priority: 'low' },
  { project: 'User Testing', deadline: '10 days', priority: 'medium' }
];

const AdminDashboardOverview = () => (
  <div className="p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-500 font-medium">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-2"
      >
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Completion Status</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={projectData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {projectData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-4 mt-4">
                  {projectData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item.name} ({item.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Weekly Progress</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#10B981" radius={4} />
                    <Bar dataKey="tasks" fill="#E5E7EB" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.project}</h4>
                    <p className="text-xs text-gray-500 mt-1">Due in {item.deadline}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                    item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                  }`}>
                    {item.priority}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Progress Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="progress"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  </div>
);

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboardOverview />;
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
        return <SettingsComponent isDarkMode={false} onThemeToggle={() => {}}/>;
      default:
        return <AdminDashboardOverview />;
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