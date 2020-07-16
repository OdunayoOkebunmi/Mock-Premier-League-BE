import {
  generateToken, comparePassword, hashPassword,
} from '../middleware/authentication';
import User from '../database/models/User';

import { errorResponse, successResponse } from '../helper/responseHandler';

export const createUser = async (req, res, next) => {
  try {
    const {
      body: {
        email, password, username, role,
      },
    } = req;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 409, { message: 'User already exist' });
    }
    const hashedPassword = hashPassword(password);
    const newUser = new User({
      email, password: hashedPassword, username, role,
    });
    const {
      _id,
      email: newUserEmail,
      role: newUserRole,
    } = newUser;
    const token = generateToken(_id, newUserEmail, newUserRole);
    await newUser.save();

    return successResponse(res, 201, 'user', { message: 'You have successfully created an account', token });
  } catch (error) {
    return next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { body: { email, password } } = req;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return errorResponse(res, 404, { message: 'User with the email does not exist' });
    }
    const verifiedPassword = comparePassword(existingUser.password, password);

    if (!verifiedPassword) {
      return errorResponse(res, 400, { message: 'Invalid password/email' });
    }
    const {
      _id, role,
    } = existingUser;
    const token = generateToken({
      _id,
      email,
      role,
    });

    return successResponse(res, 200, 'user', { message: 'You have successfully logged in', token });
  } catch (error) {
    return next(error);
  }
};
