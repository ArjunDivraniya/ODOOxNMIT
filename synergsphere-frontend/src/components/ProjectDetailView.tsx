import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Users, Calendar, BarChart3, MoreHorizontal, Trash2, Pencil } from 'lucide-react';
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
import KanbanBoard from './KanbanBoard';
import ProjectChat from './ProjectChat';
import { format } from 'date-fns';
import { projectApi, taskApi } from '@/services/api';
import { useAuth } from '@/hooks/use-auth';

interface ProjectDetailViewProps {
  projectId: string;
  onBack: () => void;
}

const statusColors = {
  planning: 'bg-gray-100 text-gray-700',
  active: 'bg-green-100 text-green-700',
  'on-hold': 'bg-amber-100 text-amber-700',
  completed: 'bg-blue-100 text-blue-700'
};

export default function ProjectDetailView({ projectId, onBack }: ProjectDetailViewProps) {
  const [project, setProject] = useState<any | null>(null);
  const [projectTasks, setProjectTasks] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectData, tasksData] = await Promise.all([
          projectApi.getById(projectId),
          taskApi.getByProject(projectId),
        ]);
        setProject(projectData);
        setProjectTasks(Array.isArray(tasksData) ? tasksData : []);
      } catch (error) {
        console.error('Failed to load project detail:', error);
      }
    };

    loadData();
  }, [projectId]);

  const projectStatus = useMemo(() => {
    if (!project) return 'planning';
    const now = new Date();
    if (now < new Date(project.startDate)) return 'planning';
    if (now > new Date(project.endDate)) return 'completed';
    return 'active';
  }, [project]);

  const projectProgress = useMemo(() => {
    const total = projectTasks.length;
    if (total === 0) return 0;
    const done = projectTasks.filter((task) => task.status === 'done').length;
    return Math.round((done / total) * 100);
  }, [projectTasks]);

  const role = useMemo(() => {
    const createdById = String(project?.createdBy?._id || project?.createdBy?.id || '');
    return user?.id === createdById ? 'owner' : 'member';
  }, [project, user?.id]);

  const handleDeleteProject = async () => {
    try {
      await projectApi.delete(projectId);
      onBack();
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  if (!project) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Project not found</p>
            <Button onClick={onBack} className="mt-4">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completedTasks = projectTasks.filter(t => t.status === 'done').length;
  const totalTasks = projectTasks.length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log('Edit project', project.id)}>
              <Pencil className="w-4 h-4 mr-2" />
              Edit Project
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteProject} className="text-red-600">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Project Info */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                <Badge className={statusColors[projectStatus as keyof typeof statusColors]}>
                  {projectStatus}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {role}
                </Badge>
              </div>
              <p className="text-gray-600 mb-4">{project.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <BarChart3 className="w-4 h-4" />
                <span>Progress</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={projectProgress} className="h-2" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>Team Members</span>
              </div>
              <div className="flex -space-x-2">
                {(project.teamMembers || []).map((member: any) => (
                  <div
                    key={member._id || member.id}
                    className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white"
                    title={member.name}
                  >
                    <span className="text-white font-medium text-xs">{(member.name || 'U').charAt(0).toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Timeline</span>
              </div>
              <div className="text-sm">
                <p className="font-medium">{format(new Date(project.startDate), 'MMM dd')} - {format(new Date(project.endDate), 'MMM dd, yyyy')}</p>
                <p className="text-amber-600">Next: {format(new Date(project.endDate), 'MMM dd')}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Tasks</span>
              </div>
              <div className="text-sm">
                <p className="font-medium">{completedTasks}/{totalTasks} completed</p>
                <p className="text-gray-500">{totalTasks - completedTasks} remaining</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Board - Takes 2 columns */}
        <div className="lg:col-span-2">
          <KanbanBoard projectId={projectId} />
        </div>

        {/* Project Chat - Takes 1 column */}
        <div className="lg:col-span-1">
          <ProjectChat projectId={projectId} />
        </div>
      </div>
    </div>
  );
}