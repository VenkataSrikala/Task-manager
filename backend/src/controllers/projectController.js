import * as projectService from '../services/projectService.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';
import { HTTP_STATUS } from '../utils/constants.js';

export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return errorResponse(res, HTTP_STATUS.BAD_REQUEST, 'Project name is required');
    }

    const project = await projectService.createProject(req.user.id, { name, description });
    return successResponse(res, HTTP_STATUS.CREATED, 'Project created successfully', project);
  } catch (error) {
    return errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const getUserProjects = async (req, res) => {
  try {
    const projects = await projectService.getUserProjects(req.user.id);
    return successResponse(res, HTTP_STATUS.OK, 'Projects retrieved', projects);
  } catch (error) {
    return errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const getProjectById = async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId);
    const project = await projectService.getProjectById(projectId, req.user.id);

    if (!project) {
      return errorResponse(res, HTTP_STATUS.NOT_FOUND, 'Project not found');
    }

    return successResponse(res, HTTP_STATUS.OK, 'Project retrieved', project);
  } catch (error) {
    return errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const addMember = async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId);
    const { email } = req.body;

    if (!email) {
      return errorResponse(res, HTTP_STATUS.BAD_REQUEST, 'Email is required');
    }

    const member = await projectService.addMemberToProject(projectId, email);
    return successResponse(res, HTTP_STATUS.CREATED, 'Member added successfully', member);
  } catch (error) {
    return errorResponse(res, HTTP_STATUS.BAD_REQUEST, error.message);
  }
};

export const removeMember = async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId);
    const userId = parseInt(req.params.userId);

    await projectService.removeMemberFromProject(projectId, userId);
    return successResponse(res, HTTP_STATUS.OK, 'Member removed successfully');
  } catch (error) {
    return errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const deleteProject = async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId);
    await projectService.deleteProject(projectId);
    return successResponse(res, HTTP_STATUS.OK, 'Project deleted successfully');
  } catch (error) {
    return errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};
