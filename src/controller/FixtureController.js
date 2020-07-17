
import Fixture from '../database/models/Fixture';
import { errorResponse, successResponse } from '../helper/responseHandler';
import { CreateUniqueSlug, handleTime } from '../helper/utils';

export const createFixture = async (req, res, next) => {
  try {
    let { body: { time } } = req;
    const {
      body: {
        home, away, location, status,
      },
    } = req;
    time = handleTime(time);
    const slug = CreateUniqueSlug(home, away);

    const data = await new Fixture({
      home, away, location, status, slug, time,
    });
    data.save();
    return successResponse(res, 201, 'fixture', { message: 'Successfully created a fixture', data });
  } catch (error) {
    return next(error);
  }
};

export const getAllFixtures = async (req, res, next) => {
  try {
    let data;
    const { query: { status } } = req;

    if (status) {
      data = await Fixture.find({ status });
    } else {
      data = await Fixture.find({});
    }
    if (data.length === 0) {
      return errorResponse(res, 404, { message: 'Fixture not found!' });
    }
    return successResponse(res, 200, 'fixture', { message: `Successfully retrieved all ${status || ' '}fixtures`, data });
  } catch (error) {
    return next(error);
  }
};


export const getFixtureBySlug = async (req, res, next) => {
  try {
    const { params: { slug } } = req;
    const data = await Fixture.find({ slug });

    if (data.length === 0) {
      return errorResponse(res, 404, { message: 'Fixture not found!' });
    }

    return successResponse(res, 200, 'fixture', { message: 'Successfully retrieved fixture', data });
  } catch (error) {
    return next(error);
  }
};

export const updateFixture = async (req, res, next) => {
  try {
    let { body: { time } } = req;
    const {
      params: { id }, body: {
        home, away, location, status,
      },
    } = req;
    time = handleTime(time);
    const slug = CreateUniqueSlug(home, away);
    const data = await Fixture.findOneAndUpdate(
      { _id: id },
      {
        time, home, away, location, status, slug,
      },
      { new: true },
    );
    if (!data) {
      return errorResponse(res, 404, { message: 'Fixture not found!' });
    }
    return successResponse(res, 200, 'fixture', { message: 'Successfully updated fixture', data });
  } catch (error) {
    return next(error);
  }
};

export const deleteFixture = async (req, res, next) => {
  try {
    const { params: { id } } = req;

    const data = await Fixture.findOneAndDelete(
      { _id: id },
    );
    if (!data) {
      return errorResponse(res, 404, { message: 'Fixture not found!' });
    }
    return successResponse(res, 200, 'fixture', { message: 'Successfully deleted fixture', data });
  } catch (error) {
    return next(error);
  }
};
