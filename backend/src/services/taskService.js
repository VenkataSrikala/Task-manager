import prisma from '../config/prisma.js';

export const createTask = async (projectId, taskData) => {
  const task = await prisma.task.create({
    data: {
      ...taskData,
      projectId,
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null,
    },
    include: {
      assignedUser: {
        select: { id: true, name: true, email: true },
      },
      project: {
        select: { id: true, name: true },
      },
    },
  });

  return task;
};

export const getProjectTasks = async (projectId) => {
  const tasks = await prisma.task.findMany({
    where: { projectId },
    include: {
      assignedUser: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return tasks;
};

export const getUserTasks = async (userId) => {
  const tasks = await prisma.task.findMany({
    where: { assignedTo: userId },
    include: {
      project: {
        select: { id: true, name: true },
      },
      assignedUser: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return tasks;
};

export const updateTask = async (taskId, updateData) => {
  const task = await prisma.task.update({
    where: { id: taskId },
    data: {
      ...updateData,
      dueDate: updateData.dueDate ? new Date(updateData.dueDate) : undefined,
    },
    include: {
      assignedUser: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  return task;
};

export const deleteTask = async (taskId) => {
  await prisma.task.delete({
    where: { id: taskId },
  });
};
