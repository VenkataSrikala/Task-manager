import prisma from '../config/prisma.js';
import { ROLES } from '../utils/constants.js';

export const createProject = async (userId, { name, description }) => {
  const project = await prisma.project.create({
    data: {
      name,
      description,
      creatorId: userId,
      members: {
        create: {
          userId,
          role: ROLES.ADMIN,
        },
      },
    },
    include: {
      creator: {
        select: { id: true, name: true, email: true },
      },
      members: {
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      },
    },
  });

  return project;
};

export const getUserProjects = async (userId) => {
  const projects = await prisma.project.findMany({
    where: {
      OR: [
        { creatorId: userId },
        { members: { some: { userId } } },
      ],
    },
    include: {
      creator: {
        select: { id: true, name: true, email: true },
      },
      members: {
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      },
      _count: {
        select: { tasks: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return projects;
};

export const getProjectById = async (projectId, userId) => {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      OR: [
        { creatorId: userId },
        { members: { some: { userId } } },
      ],
    },
    include: {
      creator: {
        select: { id: true, name: true, email: true },
      },
      members: {
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      },
      tasks: {
        include: {
          assignedUser: {
            select: { id: true, name: true, email: true },
          },
        },
      },
    },
  });

  return project;
};

export const addMemberToProject = async (projectId, email) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error('User not found');
  }

  const existingMember = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId: user.id,
      },
    },
  });

  if (existingMember) {
    throw new Error('User already a member');
  }

  const member = await prisma.projectMember.create({
    data: {
      projectId,
      userId: user.id,
      role: ROLES.MEMBER,
    },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  return member;
};

export const removeMemberFromProject = async (projectId, userId) => {
  await prisma.projectMember.delete({
    where: {
      projectId_userId: {
        projectId,
        userId,
      },
    },
  });
};

export const deleteProject = async (projectId) => {
  await prisma.project.delete({
    where: { id: projectId },
  });
};
