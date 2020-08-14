/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import dotenv from 'dotenv';
import uuid from 'uuid/v4';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';
import moment from 'moment';
import Debug from 'debug';

import { errorResponse } from '../helper/responseHandler';

const {
  MAX_WINDOW_REQUEST_COUNT, DEBUG, REDIS_URL, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_SECRET,
} = process.env;
dotenv.config();
const debug = Debug(DEBUG);

const RedisStore = connectRedis(session);
export const redisClient = redis.createClient(REDIS_URL);

redisClient.on('error', err => debug(`Redis error: ${err}`));
redisClient.on('ready', err => debug('Redis is ready'));

export const checkRateLimit = (req, res, next) => {
  if (req.session.user) {
    const currentTime = moment().unix();
    const difference = (currentTime - req.session.user.startTime) / 60;
    if (difference >= 1) {
      const body = {
        count: 1,
        startTime: moment().unix(),
      };
      req.session.user = { ...body };
      next();
    }
    if (difference < 1) {
      if (req.session.user.count > MAX_WINDOW_REQUEST_COUNT) {
        return errorResponse(res, 429, { message: 'Throttled limit exceeded. Please wait a moment and try again' });
      }
      req.session.user.count++;
      next();
    }
  } else {
    const body = {
      count: 1,
      startTime: moment().unix(),
    };
    req.session.user = { ...body };
    next();
  }
};

export default () => session({
  genid: req => uuid(),
  store: new RedisStore({
    host: REDIS_HOST,
    port: REDIS_PORT,
    pass: REDIS_PASSWORD,
    client: redisClient,
  }),
  name: '_mockPremierLeague',
  secret: REDIS_SECRET,
  resave: false,
  cookie: { secure: false, maxAge: 86400000 },
  saveUninitialized: true,
});
