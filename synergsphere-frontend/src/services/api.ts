// API Service Layer for Backend Communication

const API_BASE_URL = 'http://localhost:5001/api';

// Helper to get auth header
const getAuthHeader = () => {
  const storedAuth = localStorage.getItem('auth') || sessionStorage.getItem('auth');
  if (!storedAuth) return {};
  
  try {
    const auth = JSON.parse(storedAuth);
    return { Authorization: `Bearer ${auth.token}` };
  } catch {
    return {};
  }
};

// Generic API call function
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...options.headers,
    },
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  
  return data;
};

// ==================== PROJECT APIs ====================
export const projectApi = {
  getAll: () => apiCall('/projects'),
  
  getById: (projectId: string) => apiCall(`/projects/${projectId}`),
  
  create: (projectData: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    teamMemberEmails?: string[];
  }) => apiCall('/projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  }),
  
  update: (projectId: string, projectData: Partial<{
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  }>) => apiCall(`/projects/${projectId}`, {
    method: 'PUT',
    body: JSON.stringify(projectData),
  }),
  
  delete: (projectId: string) => apiCall(`/projects/${projectId}`, {
    method: 'DELETE',
  }),
  
  joinWithPasskey: (passkey: string) => apiCall('/projects/join', {
    method: 'POST',
    body: JSON.stringify({ passkey }),
  }),
  
  removeMember: (projectId: string, userId: string) => apiCall(`/projects/${projectId}/members/${userId}`, {
    method: 'DELETE',
  }),
};

// ==================== TASK APIs ====================
export const taskApi = {
  getByProject: (projectId: string) => apiCall(`/tasks/project/${projectId}`),
  
  create: (taskData: {
    title: string;
    description: string;
    status: string;
    priority: string;
    deadline: string;
    assignedTo: string;
    projectId: string;
  }) => apiCall('/tasks', {
    method: 'POST',
    body: JSON.stringify(taskData),
  }),
  
  update: (taskId: string, taskData: Partial<{
    title: string;
    description: string;
    status: string;
    priority: string;
    deadline: string;
    assignedTo: string;
  }>) => apiCall(`/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(taskData),
  }),
  
  delete: (taskId: string) => apiCall(`/tasks/${taskId}`, {
    method: 'DELETE',
  }),
  
  getUserTasks: () => apiCall('/tasks/user'),
};

// ==================== USER APIs ====================
export const userApi = {
  getAll: () => apiCall('/auth/users'),
  
  getById: (userId: string) => apiCall(`/auth/users/${userId}`),
  
  searchByEmail: (email: string) => apiCall(`/projects/search?email=${email}`),
  
  update: (userId: string, userData: Partial<{
    name: string;
    email: string;
    role: string;
  }>) => apiCall(`/auth/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),
  
  delete: (userId: string) => apiCall(`/auth/users/${userId}`, {
    method: 'DELETE',
  }),
};

// ==================== NOTIFICATION APIs ====================
export const notificationApi = {
  getAll: () => apiCall('/notifications'),
  
  markAsRead: (notificationId: string) => apiCall(`/notifications/${notificationId}/read`, {
    method: 'PUT',
  }),
  
  markAllAsRead: () => apiCall('/notifications/read-all', {
    method: 'PUT',
  }),
};

// ==================== MESSAGE APIs ====================
export const messageApi = {
  getByProject: (projectId: string) => apiCall(`/messages/project/${projectId}`),
  
  send: (messageData: {
    content: string;
    projectId: string;
  }) => apiCall('/messages', {
    method: 'POST',
    body: JSON.stringify(messageData),
  }),
};

// ==================== DASHBOARD/STATS APIs ====================
export const dashboardApi = {
  getAdminStats: () => apiCall('/admin/dashboard'),
  
  getUserStats: () => apiCall('/user/dashboard'),
  
  getReportsData: () => apiCall('/reports'),
};

export default {
  projectApi,
  taskApi,
  userApi,
  notificationApi,
  messageApi,
  dashboardApi,
};
