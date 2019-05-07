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
  const { firstName, hometown } = request.body;
  if (!firstName || !hometown || !request.account) {
    return next(new HttpError(400, 'Bad Request'));
  }
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
});

profileRouter.get('/profile/me', bearerAuthMiddleware, (request, response, next) => {
  logger.log(logger.INFO, 'Processing a GET on /profile/me');

  return Profile.findOne({ account: request.account._id })
    .then((profile) => {
      if (!profile) return next(new HttpError(404, 'Profile not found'));
      logger.log(logger.INFO, `Returning profile for account: ${request.account._id}`);
      return response.json(profile);
    })
    .catch(next);
});

profileRouter.put('/profile/:id', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  console.log(request.body);
  logger.log(logger.INFO, 'Processing a PUT on /profile/:id');
  const { 
    firstName, age, hometown, locationsVisited, locationsToVisit, 
  } = request.body;
  if (!firstName || !hometown || !request.account) {
    return next(new HttpError(400, 'Bad Request'));
  }

  return Profile.findByIdAndUpdate(request.params.id, {
    firstName, age, hometown,
  }, { new: true })
    .then((profile) => {
      if ((!locationsVisited || locationsVisited === {}) 
      && (!locationsToVisit || locationsToVisit === {})) {
        logger.log(logger.INFO, 'Profile Updated');
        return response.json(profile);
      }
      logger.log(logger.INFO, 'Updating location data...');
      
      if (locationsVisited) {
        const countryVisited = Object.keys(locationsVisited)[0];
        const citiesVisited = locationsVisited[countryVisited];

        if (!Object.keys(profile.locationsVisited).includes(countryVisited)) {
          logger.log(logger.INFO, 'Adding new country and cities - visited list');
          profile.locationsVisited[countryVisited] = citiesVisited;
          profile.save()
            .then((profileSaved) => {
              logger.log(logger.INFO, 'Profile updated');
              return response.json(profileSaved);
            })
            .catch(next);
        } else {
          logger.log(logger.INFO, 'Adding cities to existing country - visited list');
          profile.locationsVisited[countryVisited].push(...citiesVisited);
          profile.save()
            .then((profileSaved) => {
              logger.log(logger.INFO, 'Profile updated');
              return response.json(profileSaved);
            });
        }
      } else {
        const countryToVisit = Object.keys(locationsToVisit)[0];
        const citiesToVisit = locationsToVisit[countryToVisit];

        if (!Object.keys(profile.locationsToVisit).includes(countryToVisit)) {
          logger.log(logger.INFO, 'Adding new country and cities - to visit list');
          profile.locationsToVisit[countryToVisit] = citiesToVisit;
          profile.save()
            .then((profileSaved) => {
              logger.log(logger.INFO, 'Profile updated');
              return response.json(profileSaved);
            });
        } else {
          logger.log(logger.INFO, 'Adding cities to existing country - to visit list');
          profile.locationsToVisit[countryToVisit].push(...citiesToVisit);
          profile.save()
            .then((profileSaved) => {
              logger.log(logger.INFO, 'Profile updated');
              return response.json(profileSaved);
            });
        }
      }
      return response.json(profile);
    })
    .catch(next);
});

export default profileRouter;
