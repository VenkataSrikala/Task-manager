import express from 'express';
import * as projectController from '../controllers/projectController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { isProjectAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', authenticate, projectController.createProject);
router.get('/', authenticate, projectController.getUserProjects);
router.get('/:projectId', authenticate, projectController.getProjectById);
router.post('/:projectId/members', authenticate, isProjectAdmin, projectController.addMember);
router.delete('/:projectId/members/:userId', authenticate, isProjectAdmin, projectController.removeMember);
router.delete('/:projectId', authenticate, isProjectAdmin, projectController.deleteProject);

export default router;
