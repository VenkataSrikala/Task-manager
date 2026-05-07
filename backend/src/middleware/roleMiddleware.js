import { errorResponse } from '../utils/responseHandler.js';
import { HTTP_STATUS, ROLES } from '../utils/constants.js';
import prisma from '../config/prisma.js';

export const isProjectAdmin = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    const project = await prisma.project.findUnique({
      where: { id: parseInt(projectId) },
      include: {
        members: {
          where: { userId },
        },
      },
    });

    if (!project) {
      return errorResponse(res, HTTP_STATUS.NOT_FOUND, 'Project not found');
    }

    const isCreator = project.creatorId === userId;
    const isAdmin = project.members.some(m => m.userId === userId && m.role === ROLES.ADMIN);

    if (!isCreator && !isAdmin) {
      return errorResponse(res, HTTP_STATUS.FORBIDDEN, 'Admin access required');
    }

    next();
  } catch (error) {
    return errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Authorization check failed');
  }
};

export const isProjectMember = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    const project = await prisma.project.findUnique({
      where: { id: parseInt(projectId) },
      include: {
        members: {
          where: { userId },
        },
      },
    });

    if (!project) {
      return errorResponse(res, HTTP_STATUS.NOT_FOUND, 'Project not found');
    }

    const isMember = project.creatorId === userId || project.members.length > 0;

    if (!isMember) {
      return errorResponse(res, HTTP_STATUS.FORBIDDEN, 'Project access denied');
    }

    next();
  } catch (error) {
    return errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Authorization check failed');
  }
};
