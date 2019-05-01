'use strict';

import express from 'express';
import cors from 'cors';
import HttpError from 'http-errors';
import mongoose from 'mongoose';

import logger from './logger';
import accountRouter from '../routes/account-router';
import profileRouter from '../routes/profile-router';
import errorMiddleware from './error-middleware';

const app = express();
let server = null;

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

app.use(accountRouter);
app.use(profileRouter);

app.all('*', (request, response) => {
  logger.log(logger.INFO, '404 - not found (catch-all)');
  return response.sendStatus(404);
});

app.use(errorMiddleware);

const startServer = () => {
  return mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
      server = app.listen(process.env.PORT, () => {
        logger.log(logger.INFO, `Server listening on port ${process.env.PORT}`);
      });
    })
    .catch(() => {
      logger.log(logger.ERROR, 'Server failed to start');
      throw new HttpError(500, 'Server Error - failed to start');
    });
};

const stopServer = () => {
  return mongoose.disconnect()
    .then(() => {
      server.close(() => {
        logger.log(logger.INFO, 'Server disconnected');
      });
    });
};

export { startServer, stopServer };
