import prisma from '../config/prisma.js';
import { isOverdue } from '../utils/dateUtils.js';

export const getDashboardStats = async (userId) => {
  const userProjects = await prisma.project.findMany({
    where: {
      OR: [
        { creatorId: userId },
        { members: { some: { userId } } },
      ],
    },
    select: { id: true },
  });

  const projectIds = userProjects.map(p => p.id);

  const tasks = await prisma.task.findMany({
    where: {
      projectId: { in: projectIds },
    },
    include: {
      assignedUser: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  const totalTasks = tasks.length;
  const todoTasks = tasks.filter(t => t.status === 'TODO').length;
  const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS').length;
  const doneTasks = tasks.filter(t => t.status === 'DONE').length;
  const overdueTasks = tasks.filter(t => t.status !== 'DONE' && isOverdue(t.dueDate));

  const tasksByUser = tasks.reduce((acc, task) => {
    if (task.assignedUser) {
      const userName = task.assignedUser.name;
      acc[userName] = (acc[userName] || 0) + 1;
    }
    return acc;
  }, {});

  return {
    totalTasks,
    tasksByStatus: {
      todo: todoTasks,
      inProgress: inProgressTasks,
      done: doneTasks,
    },
    overdueTasks: {
      count: overdueTasks.length,
      tasks: overdueTasks.map(t => ({
        id: t.id,
        title: t.title,
        dueDate: t.dueDate,
        assignedUser: t.assignedUser,
      })),
    },
    tasksByUser,
  };
};
