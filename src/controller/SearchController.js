/* eslint-disable import/prefer-default-export */
import Fixture from '../database/models/Fixture';
import Team from '../database/models/Team';
import { errorResponse, successResponse } from '../helper/responseHandler';
import { searchByStatus } from '../helper/utils';


export const searchFunction = async (req, res, next) => {
  try {
    const { query: { name, status } } = req;
    const teamDetails = await Team.find({ name });
    if (teamDetails.length === 0) {
      return errorResponse(res, 404, { message: 'Fixture not found!' });
    }
    const teamFixtures = await Fixture.find({
      $or: [{ home: name }, { away: name }],
    });
    const team = {
      team: teamDetails,
      fixtures: teamFixtures,
    };
    if (status) {
      const filteredFixtures = searchByStatus(status, teamFixtures);
      return successResponse(res, 200, 'teamDetails', { message: 'Successfully retrieved team details', data: { ...team, fixtures: filteredFixtures } });
    }
    return successResponse(res, 200, 'teamDetails', { message: 'Successfully retrieved team details', data: team });
  } catch (error) {
    return next(error);
  }
};
