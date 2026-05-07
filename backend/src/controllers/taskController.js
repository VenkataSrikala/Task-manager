import * as taskService from '../services/taskService.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';
import { HTTP_STATUS } from '../utils/constants.js';

export const createTask = async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId);
    const { title, description, status, priority, dueDate, assignedTo } = req.body;

    if (!title) {
      return errorResponse(res, HTTP_STATUS.BAD_REQUEST, 'Task title is required');
    }

    const task = await taskService.createTask(projectId, {
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo: assignedTo ? parseInt(assignedTo) : null,
    });

    return successResponse(res, HTTP_STATUS.CREATED, 'Task created successfully', task);
  } catch (error) {
    return errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const getProjectTasks = async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId);
    const tasks = await taskService.getProjectTasks(projectId);
    return successResponse(res, HTTP_STATUS.OK, 'Tasks retrieved', tasks);
  } catch (error) {
    return errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const tasks = await taskService.getUserTasks(req.user.id);
    return successResponse(res, HTTP_STATUS.OK, 'Tasks retrieved', tasks);
  } catch (error) {
    return errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.taskId);
    const updateData = req.body;

    const task = await taskService.updateTask(taskId, updateData);
    return successResponse(res, HTTP_STATUS.OK, 'Task updated successfully', task);
  } catch (error) {
    return errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.taskId);
    await taskService.deleteTask(taskId);
    return successResponse(res, HTTP_STATUS.OK, 'Task deleted successfully');
  } catch (error) {
    return errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};
