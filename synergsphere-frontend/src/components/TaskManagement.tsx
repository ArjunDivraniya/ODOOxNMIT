import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, Calendar, User, AlertCircle, Clock, BarChart3, CheckSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { mockUsers } from "../lib/mockData";

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: {
    name: string;
    avatar: string;
  };
  dueDate: string;
  projectName: string;
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design System Update',
    description: 'Update the design system with new color palette and typography',
    status: 'todo',
    priority: 'high',
    assignee: { name: 'John Doe', avatar: '/api/placeholder/32/32' },
    dueDate: '2024-01-15',
    projectName: 'Mobile App Redesign'
  },
  {
    id: '2',
    title: 'API Integration',
    description: 'Integrate payment gateway API',
    status: 'todo',
    priority: 'medium',
    assignee: { name: 'Jane Smith', avatar: '/api/placeholder/32/32' },
    dueDate: '2024-01-18',
    projectName: 'E-commerce Platform'
  },
  {
    id: '3',
    title: 'User Testing',
    description: 'Conduct user testing sessions for new features',
    status: 'in-progress',
    priority: 'high',
    assignee: { name: 'Mike Johnson', avatar: '/api/placeholder/32/32' },
    dueDate: '2024-01-20',
    projectName: 'Website Optimization'
  },
  {
    id: '4',
    title: 'Database Optimization',
    description: 'Optimize database queries for better performance',
    status: 'in-progress',
    priority: 'medium',
    assignee: { name: 'Sarah Wilson', avatar: '/api/placeholder/32/32' },
    dueDate: '2024-01-22',
    projectName: 'Backend Improvements'
  },
  {
    id: '5',
    title: 'Documentation Update',
    description: 'Update API documentation with new endpoints',
    status: 'done',
    priority: 'low',
    assignee: { name: 'Tom Brown', avatar: '/api/placeholder/32/32' },
    dueDate: '2024-01-10',
    projectName: 'API Integration'
  }
];

function SortableTask({ task }: { task: Task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="cursor-grab active:cursor-grabbing"
    >
      <Card className="mb-3 hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <h4 className="font-semibold text-sm">{task.title}</h4>
              <Badge className={getPriorityColor(task.priority)}>
                {task.priority}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {task.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                  <AvatarFallback className="text-xs">
                    {task.assignee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-500">{task.assignee.name}</span>
              </div>
              
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
            </div>
            
            <div className="text-xs text-gray-500">
              Project: {task.projectName}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function TaskManagement() {
  const [tasks, setTasks] = useState(initialTasks);
  const [viewMode, setViewMode] = useState<'kanban' | 'timeline'>('kanban');
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over?.id);

        return arrayMove(tasks, oldIndex, newIndex);
      });
    }
  };

  const getTasksByStatus = (status: 'todo' | 'in-progress' | 'done') => {
    return tasks.filter(task => task.status === status);
  };

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100 dark:bg-gray-800' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100 dark:bg-blue-900/20' },
    { id: 'done', title: 'Done', color: 'bg-green-100 dark:bg-green-900/20' }
  ];

  const totalTasks = tasks.length;
  const completedTasks = getTasksByStatus('done').length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Task Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track and manage team tasks</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className="text-xs"
            >
              Kanban
            </Button>
            <Button
              variant={viewMode === 'timeline' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('timeline')}
              className="text-xs"
            >
              Timeline
            </Button>
          </div>
          
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <CheckSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalTasks}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{getTasksByStatus('in-progress').length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <CheckSquare className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedTasks}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
                <span className="font-medium">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      {viewMode === 'kanban' && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map((column) => {
              const columnTasks = getTasksByStatus(column.id as 'todo' | 'in-progress' | 'done');
              
              return (
                <motion.div
                  key={column.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className={`p-4 rounded-lg ${column.color}`}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{column.title}</h3>
                      <Badge variant="secondary">{columnTasks.length}</Badge>
                    </div>
                  </div>
                  
                  <div className="min-h-[400px]">
                    <SortableContext
                      items={columnTasks.map(task => task.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <AnimatePresence>
                        {columnTasks.map((task) => (
                          <SortableTask key={task.id} task={task} />
                        ))}
                      </AnimatePresence>
                    </SortableContext>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </DndContext>
      )}

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Timeline View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold">{task.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                        <AvatarFallback className="text-xs">
                          {task.assignee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-right">
                        <p className="text-sm font-medium">{task.assignee.name}</p>
                        <p className="text-xs text-gray-500">{new Date(task.dueDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
