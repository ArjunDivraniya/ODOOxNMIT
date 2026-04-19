import { useEffect, useMemo, useState } from 'react';
import { Bell, Check, X, Eye, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { notificationApi } from '@/services/api';

type UserNotification = {
  id: string;
  title: string;
  message: string;
  type: 'task_assigned' | 'deadline_approaching' | 'project_update' | 'mention' | 'invitation';
  read: boolean;
  actionRequired: boolean;
  timestamp: string;
  projectId?: string;
};

const notificationIcons = {
  task_assigned: '📋',
  deadline_approaching: '⏰',
  project_update: '📊',
  mention: '💬',
  invitation: '📨'
};

const notificationColors = {
  task_assigned: 'bg-blue-100 text-blue-700',
  deadline_approaching: 'bg-amber-100 text-amber-700',
  project_update: 'bg-green-100 text-green-700',
  mention: 'bg-purple-100 text-purple-700',
  invitation: 'bg-teal-100 text-teal-700'
};

export default function NotificationsCenter() {
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await notificationApi.getAll();
        const mapped: UserNotification[] = (Array.isArray(data) ? data : []).map((notification: any) => ({
          id: notification._id,
          title: notification.title,
          message: notification.message,
          type: mapNotificationType(notification.type),
          read: notification.isRead,
          actionRequired: notification.type === 'project_invite',
          timestamp: notification.createdAt,
          projectId: notification.project?._id,
        }));
        setNotifications(mapped);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    loadNotifications();
  }, []);

  const mapNotificationType = (apiType: string): UserNotification['type'] => {
    if (apiType === 'project_invite') return 'invitation';
    if (apiType === 'deadline_reminder') return 'deadline_approaching';
    if (apiType === 'message_mention') return 'mention';
    if (apiType === 'task_assigned') return 'task_assigned';
    return 'project_update';
  };

  const filteredNotifications = useMemo(() => notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    if (filter === 'action-required') return notification.actionRequired;
    return notification.type === filter;
  }), [notifications, filter]);

  const markAsRead = async (notificationId: string) => {
    try {
      await notificationApi.markAsRead(notificationId);
      setNotifications(prev => prev.map(notification => 
        notification.id === notificationId ? { ...notification, read: true } : notification
      ));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationApi.markAllAsRead();
      setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      await notificationApi.delete(notificationId);
      setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white">
              {unreadCount} unread
            </Badge>
          )}
        </div>
        
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            <Check className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter:</span>
            </div>
            
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All notifications" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Notifications</SelectItem>
                <SelectItem value="unread">Unread Only</SelectItem>
                <SelectItem value="action-required">Action Required</SelectItem>
                <SelectItem value="task_assigned">Task Assignments</SelectItem>
                <SelectItem value="deadline_approaching">Deadlines</SelectItem>
                <SelectItem value="mention">Mentions</SelectItem>
                <SelectItem value="invitation">Invitations</SelectItem>
                <SelectItem value="project_update">Project Updates</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2 text-sm text-gray-500 ml-auto">
              <span>{filteredNotifications.length} notifications</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No notifications found</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`hover:shadow-md transition-shadow ${
                !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="text-2xl">
                      {notificationIcons[notification.type]}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                        <Badge className={notificationColors[notification.type]}>
                          {notification.type.replace('_', ' ')}
                        </Badge>
                        {notification.actionRequired && (
                          <Badge variant="destructive" className="bg-red-100 text-red-700">
                            Action Required
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-2">{notification.message}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{format(new Date(notification.timestamp), 'MMM dd, yyyy HH:mm')}</span>
                        {notification.projectId && (
                          <span className="text-blue-600">Project Related</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}