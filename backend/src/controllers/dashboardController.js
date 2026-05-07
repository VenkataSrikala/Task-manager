import { getDashboardStats } from '../services/dashboardService.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';
import { HTTP_STATUS } from '../utils/constants.js';

export const getStats = async (req, res) => {
  try {
    const stats = await getDashboardStats(req.user.id);
    return successResponse(res, HTTP_STATUS.OK, 'Dashboard stats retrieved', stats);
  } catch (error) {
    return errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};
