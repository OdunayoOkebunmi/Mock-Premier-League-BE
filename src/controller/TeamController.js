import Team from '../database/models/Team';
import { errorResponse, successResponse } from '../helper/responseHandler';

export const createTeam = async (req, res, next) => {
  try {
    const { body: { name } } = req;
    const existingTeam = await Team.findOne({ name });
    if (existingTeam) {
      return errorResponse(res, 409, { message: 'Team already exists!' });
    }
    const data = await new Team({
      name,
    });
    data.save();
    return successResponse(res, 201, 'team', { message: 'Successfully created a team', data });
  } catch (error) {
    return next(error);
  }
};

export const getAllTeams = async (req, res, next) => {
  try {
    const data = await Team.find({});
    if (data.length === 0) {
      return errorResponse(res, 404, { message: 'Team not found!' });
    }
    return successResponse(res, 200, 'team', { message: 'Successfully retrieved all teams', data });
  } catch (error) {
    return next(error);
  }
};

export const getOneTeam = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const data = await Team.find({ _id: id });
    if (data.length === 0) {
      return errorResponse(res, 404, { message: 'Team not found!' });
    }
    return successResponse(res, 200, 'team', { message: 'Successfully retrieved team', data });
  } catch (error) {
    return next(error);
  }
};

export const updateTeam = async (req, res, next) => {
  try {
    const { params: { id }, body: { name } } = req;
    const teamExist = await Team.findOne({ name });
    if (teamExist) {
      return errorResponse(res, 409, { message: 'Name already exist!' });
    }
    const data = await Team.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true },
    );
    if (!data) {
      return errorResponse(res, 404, { message: 'Team not found!' });
    }
    return successResponse(res, 200, 'team', { message: 'Successfully updated team', data });
  } catch (error) {
    return next(error);
  }
};

export const deleteTeam = async (req, res, next) => {
  try {
    const { params: { id } } = req;

    const data = await Team.findOneAndDelete(
      { _id: id },
    );
    if (!data) {
      return errorResponse(res, 404, { message: 'Team not found!' });
    }
    return successResponse(res, 200, 'team', { message: 'Successfully deleted team', data });
  } catch (error) {
    return next(error);
  }
};
