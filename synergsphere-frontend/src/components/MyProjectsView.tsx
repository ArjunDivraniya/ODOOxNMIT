import { useEffect, useMemo, useState } from 'react';
import { Eye, Calendar, Users, MoreHorizontal, Trash2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { projectApi, taskApi } from '@/services/api';
import { useAuth } from '@/hooks/use-auth';

type ApiProject = {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  createdBy: { _id?: string; id?: string };
  teamMembers: Array<{ _id?: string; id?: string; name?: string; email?: string }>;
};

interface MyProjectsViewProps {
  onProjectSelect: (projectId: string) => void;
}

const statusColors = {
  planning: 'bg-gray-100 text-gray-700',
  active: 'bg-green-100 text-green-700',
  'on-hold': 'bg-amber-100 text-amber-700',
  completed: 'bg-blue-100 text-blue-700'
};

export default function MyProjectsView({ onProjectSelect }: MyProjectsViewProps) {
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [projectProgress, setProjectProgress] = useState<Record<string, number>>({});
  const { user } = useAuth();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await projectApi.getAll();
        setProjects(Array.isArray(data) ? data : data.projects || []);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    const loadProgress = async () => {
      const progressEntries = await Promise.all(
        projects.map(async (project) => {
          try {
            const tasks = await taskApi.getByProject(project._id);
            const total = Array.isArray(tasks) ? tasks.length : 0;
            const done = Array.isArray(tasks)
              ? tasks.filter((task: any) => task.status === 'done').length
              : 0;
            return [project._id, total > 0 ? Math.round((done / total) * 100) : 0] as const;
          } catch {
            return [project._id, 0] as const;
          }
        })
      );
      setProjectProgress(Object.fromEntries(progressEntries));
    };

    if (projects.length > 0) {
      loadProgress();
    }
  }, [projects]);

  const enrichedProjects = useMemo(() => {
    return projects.map((project) => {
      const ownerId = String(project.createdBy?._id || project.createdBy?.id || '');
      const role = user?.id === ownerId ? 'owner' : 'member';
      const progress = projectProgress[project._id] ?? 0;

      const now = new Date();
      const end = new Date(project.endDate);
      let status: 'planning' | 'active' | 'completed' = 'active';
      if (now < new Date(project.startDate)) status = 'planning';
      if (now > end) status = 'completed';

      return {
        ...project,
        role,
        progress,
        status,
      };
    });
  }, [projects, projectProgress, user?.id]);

  const handleDeleteProject = (projectId: string) => {
    projectApi.delete(projectId)
      .then(() => setProjects((prev) => prev.filter((p) => p._id !== projectId)))
      .catch((error) => console.error('Failed to delete project:', error));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Active Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrichedProjects.map((project) => (
            <Card key={project._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                    </div>
                      <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                      {project.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{project.teamMembers.length} members</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="capitalize">{project.role}</span>
                    </div>
                  </div>

                  {project.endDate && (
                    <div className="flex items-center space-x-1 text-sm text-amber-600">
                      <Calendar className="w-4 h-4" />
                      <span>Due {format(new Date(project.endDate), 'MMM dd')}</span>
                    </div>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <MoreHorizontal className="w-4 h-4 mr-2" />
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onProjectSelect(project._id)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Project
                      </DropdownMenuItem>
                      {project.role === 'owner' && (
                        <DropdownMenuItem onClick={() => handleDeleteProject(project._id)} className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Project
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}