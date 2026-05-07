import { verifyToken } from '../utils/generateToken.js';
import { errorResponse } from '../utils/responseHandler.js';
import { HTTP_STATUS } from '../utils/constants.js';
import prisma from '../config/prisma.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return errorResponse(res, HTTP_STATUS.UNAUTHORIZED, 'No token provided');
    }

    const decoded = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      return errorResponse(res, HTTP_STATUS.UNAUTHORIZED, 'Invalid token');
    }

    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, HTTP_STATUS.UNAUTHORIZED, 'Invalid or expired token');
  }
};
