import '@babel/polyfill';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Debug from 'debug';
import logger from 'morgan';
import router from './routes';
import connectToDB from './database/config';
import { serverErrorResponse, developmentServerErrorResponse } from './helper/responseHandler';

if (process.env.NODE_ENV !== 'production') dotenv.config();

const app = express();
const debug = Debug(process.env.DEBUG);
const isProduction = process.env.NODE_ENV === 'production';

app.use(cors());
app.use(logger(':method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(express.json());

process.on('uncaughtException', (err) => {
  debug(err.stack);
  process.exit(1);
});

if (!isProduction) {
  app.use(developmentServerErrorResponse);
}
app.use(serverErrorResponse);

// Handle non existing routes
app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Page not found',
}));

(async () => {
  try {
    await connectToDB();
  } catch (err) {
    debug(err);
  }
})();

const server = app.listen(process.env.PORT || 5000, () => {
  debug(`Listening on port ${server.address().port}`);
});


export default app;
