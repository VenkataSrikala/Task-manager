import { errorResponse } from '../utils/responseHandler.js';
import { HTTP_STATUS } from '../utils/constants.js';

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal server error';

  return errorResponse(res, statusCode, message);
};

export const notFound = (req, res) => {
  return errorResponse(res, HTTP_STATUS.NOT_FOUND, 'Route not found');
};
