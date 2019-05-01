'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';

import Profile from '../models/profile';
import logger from '../lib/logger';
import bearerAuthMiddleware from '../lib/bearer-auth-middleware';

const profileRouter = new Router();
const jsonParser = json();

profileRouter.post('/profile', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  const { firstName, age, hometown, locationsVisted, locationsToVisit } = request.body;
  if (!firstName || !hometown || !request.account ) return next(new HttpError(400, 'Bad Request'));
  logger.log(logger.INFO, 'Processing a POST on /profile');

  return new Profile({
    ...request.body,
    account: request.account._id,
  }).save()
  .then((profile) => {
    logger.log(logger.INFO, `Returning new profile for ${request.body.firstName}`);
    return response.json(profile);
  })
  .catch(next);
})

profileRouter.get('/profile/me', bearerAuthMiddleware, (request, response, next) => {
  logger.log(logger.INFO, 'Processing a GET on /profile/me');

  return Profile.findOne({ account: request.account._id })
    .then((profile) => {
      if (!profile) return next(new HttpError(404, 'Profile not found'));
      logger.log(logger.INFO, `Returning profile for account: ${request.account._id}`);
      return response.json(profile);
    })
    .catch(next);
})

export default profileRouter;
