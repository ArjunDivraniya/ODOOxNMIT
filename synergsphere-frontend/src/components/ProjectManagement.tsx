import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MoreVertical, Calendar, Users, TrendingUp, Edit, Trash2, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { projectApi } from '@/services/api';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

interface Project {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  teamMembers: any[];
  passkey: string;
  createdBy: any;
}

export default function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    teamMemberEmails: [] as string[],
  });

  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectApi.getAll();
      setProjects(data.projects || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch projects',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    try {
      if (!newProject.name || !newProject.description || !newProject.startDate || !newProject.endDate) {
        toast({
          title: 'Validation Error',
          description: 'Please fill all required fields',
          variant: 'destructive',
        });
        return;
      }

      await projectApi.create(newProject);
      toast({
        title: 'Success',
        description: 'Project created successfully',
      });
      
      setIsNewProjectOpen(false);
      setNewProject({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        teamMemberEmails: [],
      });
      setEmailInput('');
      fetchProjects();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create project',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateProject = async () => {
    if (!selectedProject) return;
    
    try {
      await projectApi.update(selectedProject._id, {
        name: selectedProject.name,
        description: selectedProject.description,
        startDate: selectedProject.startDate,
        endDate: selectedProject.endDate,
      });
      
      toast({
        title: 'Success',
        description: 'Project updated successfully',
      });
      
      setIsEditOpen(false);
      setSelectedProject(null);
      fetchProjects();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update project',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await projectApi.delete(projectId);
      toast({
        title: 'Success',
        description: 'Project deleted successfully',
      });
      fetchProjects();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete project',
        variant: 'destructive',
      });
    }
  };

  const addEmailToTeam = () => {
    if (emailInput && emailInput.includes('@')) {
      setNewProject(prev => ({
        ...prev,
        teamMemberEmails: [...prev.teamMemberEmails, emailInput]
      }));
      setEmailInput('');
    }
  };

  const removeEmail = (email: string) => {
    setNewProject(prev => ({
      ...prev,
      teamMemberEmails: prev.teamMemberEmails.filter(e => e !== email)
    }));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track your team projects</p>
        </div>
        
        {user?.role === 'admin' && (
          <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 py-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name *</Label>
                  <Input
                    id="name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    placeholder="Enter project name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Enter project description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newProject.startDate}
                      onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newProject.endDate}
                      onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emails">Team Member Emails</Label>
                  <div className="flex gap-2">
                    <Input
                      id="emails"
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="team@example.com"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEmailToTeam())}
                    />
                    <Button type="button" onClick={addEmailToTeam}>Add</Button>
                  </div>
                  {newProject.teamMemberEmails.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {newProject.teamMemberEmails.map((email) => (
                        <Badge key={email} variant="secondary" className="gap-1">
                          {email}
                          <button onClick={() => removeEmail(email)} className="ml-1 hover:text-red-600">×</button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsNewProjectOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateProject}>Create Project</Button>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Project Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No projects yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Get started by creating your first project</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                          {project.name}
                        </CardTitle>
                        {project.passkey && (
                          <p className="text-xs text-gray-500 mt-1">Passkey: {project.passkey}</p>
                        )}
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedProject(project)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {user?.role === 'admin' && (
                            <>
                              <DropdownMenuItem onClick={() => { setSelectedProject(project); setIsEditOpen(true); }}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Project
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteProject(project._id)}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Project
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(project.startDate).toLocaleDateString()}
                      </div>
                      
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-gray-400" />
                        <div className="flex -space-x-2">
                          {project.teamMembers.slice(0, 3).map((member, idx) => (
                            <Avatar key={idx} className="w-6 h-6 border-2 border-white dark:border-gray-800">
                              <AvatarFallback className="text-xs">
                                {member.name?.charAt(0) || 'U'}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {project.teamMembers.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                              <span className="text-xs font-medium">+{project.teamMembers.length - 3}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}