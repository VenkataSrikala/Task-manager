import { registerUser, loginUser } from '../services/authService.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';
import { HTTP_STATUS } from '../utils/constants.js';

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return errorResponse(res, HTTP_STATUS.BAD_REQUEST, 'All fields are required');
    }

    const result = await registerUser({ name, email, password });
    return successResponse(res, HTTP_STATUS.CREATED, 'User registered successfully', result);
  } catch (error) {
    return errorResponse(res, HTTP_STATUS.BAD_REQUEST, error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, HTTP_STATUS.BAD_REQUEST, 'Email and password are required');
    }

    const result = await loginUser({ email, password });
    return successResponse(res, HTTP_STATUS.OK, 'Login successful', result);
  } catch (error) {
    return errorResponse(res, HTTP_STATUS.UNAUTHORIZED, error.message);
  }
};

export const getProfile = async (req, res) => {
  try {
    return successResponse(res, HTTP_STATUS.OK, 'Profile retrieved', req.user);
  } catch (error) {
    return errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};
