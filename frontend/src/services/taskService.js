import api from '../api/axios';

export const createTask = async (projectId, taskData) => {
  const response = await api.post(`/tasks/projects/${projectId}/tasks`, taskData);
  return response.data;
};

export const getProjectTasks = async (projectId) => {
  const response = await api.get(`/tasks/projects/${projectId}/tasks`);
  return response.data;
};

export const getMyTasks = async () => {
  const response = await api.get('/tasks/my-tasks');
  return response.data;
};

export const updateTask = async (taskId, updateData) => {
  const response = await api.put(`/tasks/${taskId}`, updateData);
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};
