import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { isProjectMember, isProjectAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/projects/:projectId/tasks', authenticate, isProjectAdmin, taskController.createTask);
router.get('/projects/:projectId/tasks', authenticate, isProjectMember, taskController.getProjectTasks);
router.get('/my-tasks', authenticate, taskController.getUserTasks);
router.put('/:taskId', authenticate, taskController.updateTask);
router.delete('/:taskId', authenticate, isProjectAdmin, taskController.deleteTask);

export default router;
