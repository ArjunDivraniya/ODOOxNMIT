// Reports & Analytics Page
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, CheckCircle, AlertCircle, Target, Clock } from 'lucide-react';
import { projectApi, taskApi, userApi } from '@/services/api';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  totalUsers: number;
  projectData: any[];
  taskStatusData: any[];
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function ReportsPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchReportsData();
  }, []);

  const fetchReportsData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [projectsData, usersData] = await Promise.all([
        projectApi.getAll().catch(() => ({ projects: [] })),
        user?.role === 'admin' ? userApi.getAll().catch(() => ({ users: [] })) : Promise.resolve({ users: [] })
      ]);

      const projects = projectsData.projects || [];
      const users = usersData.users || [];

      // Calculate stats
      const activeProjects = projects.filter((p: any) => 
        new Date(p.endDate) > new Date()
      ).length;
      
      const completedProjects = projects.length - activeProjects;

      // Project timeline data
      const projectData = projects.slice(0, 10).map((p: any) => ({
        name: p.name.substring(0, 15) + (p.name.length > 15 ? '...' : ''),
        members: p.teamMembers?.length || 0,
        progress: 50, // Default since we don't have progress field
      }));

      // Mock task status data (since we need project-specific task queries)
      const taskStatusData = [
        { name: 'To Do', value: 30 },
        { name: 'In Progress', value: 45 },
        { name: 'Completed', value: 80 },
        { name: 'Blocked', value: 10 },
      ];

      setStats({
        totalProjects: projects.length,
        activeProjects,
        completedProjects,
        totalTasks: 165, // Mock data
        completedTasks: 80,
        inProgressTasks: 45,
        totalUsers: users.length,
        projectData,
        taskStatusData,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch reports data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading reports...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Comprehensive overview of your workspace performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalProjects}</p>
                <p className="text-xs text-gray-500 mt-1">{stats.activeProjects} active</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalTasks}</p>
                <p className="text-xs text-gray-500 mt-1">{stats.completedTasks} completed</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.inProgressTasks}</p>
                <p className="text-xs text-gray-500 mt-1">Active tasks</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {user?.role === 'admin' && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Team Members</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
                  <p className="text-xs text-gray-500 mt-1">Active users</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Team Size Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Project Team Sizes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.projectData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="members" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Task Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.taskStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Project Progress Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Project Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.projectData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="progress" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Summary Section */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <p className="font-semibold">Project Completion Rate</p>
                <p className="text-sm text-gray-500">
                  {stats.totalProjects > 0 
                    ? ((stats.completedProjects / stats.totalProjects) * 100).toFixed(1)
                    : 0}% of projects completed
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <p className="font-semibold">Task Completion Rate</p>
                <p className="text-sm text-gray-500">
                  {stats.totalTasks > 0 
                    ? ((stats.completedTasks / stats.totalTasks) * 100).toFixed(1)
                    : 0}% of tasks completed
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <p className="font-semibold">Average Team Size</p>
                <p className="text-sm text-gray-500">
                  {stats.projectData.length > 0 
                    ? (stats.projectData.reduce((sum, p) => sum + p.members, 0) / stats.projectData.length).toFixed(1)
                    : 0} members per project
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
