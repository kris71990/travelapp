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
  logger.log(logger.INFO, 'Processing a PUT on /profile/:id');
  const { 
    firstName, age, hometown, locationsVisited, locationsToVisit, 
  } = request.body;
  
  // simple profile update of name, age, or hometown
  if (!locationsVisited && !locationsToVisit) {
    if (!firstName || !hometown || !request.account) {
      return next(new HttpError(400, 'Bad Request'));
    }
    return Profile.findByIdAndUpdate(request.params.id, {
      firstName, age, hometown,
    }, { new: true })
      .then((profile) => {
        logger.log(logger.INFO, 'Profile Updated');
        return response.json(profile);
      })
      .catch(next);
  }

  logger.log(logger.INFO, 'Updating location data...');

  // cannot add cities and country at the same time
  // if locationsVisited is a string, it is a country 
  if (locationsVisited) {
    if (typeof locationsVisited === 'string') {
      logger.log(logger.INFO, 'Adding new country to visited list');
      const country = locationsVisited;
      const time = new Date();
      if (!country) return next(new HttpError(400, 'Bad Request'));
      const newCountry = {
        name: country, 
        cities: [],
        created: time,
        updated: time,
      };
      return Profile.findOneAndUpdate({ _id: request.params.id }, {
        $push: { locationsVisited: newCountry },
      }, { new: true })
        .then((profile) => {
          logger.log(logger.INFO, 'Profile updated');
          return response.json(profile);
        })
        .catch(next);
    } 

    // if it is an object { russia: [moscow, spb, etc] }, update country with cities
    logger.log(logger.INFO, 'Adding cities to existing country - visited list');
    const country = Object.keys(locationsVisited)[0];
    const time = new Date();
    const cities = locationsVisited[country].split(',').map((city) => {
      return city.trim();
    });

    return Profile.findOneAndUpdate({ _id: request.params.id, 'locationsVisited.name': country }, {
      $addToSet: { 'locationsVisited.$.cities': { $each: cities } },
      'locationsVisited.$.updated': time,
    }, { new: true })
      .then((profile) => {
        logger.log(logger.INFO, 'Profile updated');
        return response.json(profile);
      })
      .catch(next);
  }

  // if locationsToVisit is a string, it is a country
  if (typeof locationsToVisit === 'string') {
    logger.log(logger.INFO, 'Adding new country to to-visit list');
    const country = locationsToVisit;
    const time = new Date();
    if (!country) return next(new HttpError(400, 'Bad Request'));
    const newCountry = {
      name: country, 
      cities: [],
      created: time,
      updated: time,
    };
    return Profile.findOneAndUpdate({ _id: request.params.id }, {
      $push: { locationsToVisit: newCountry },
    }, { new: true })
      .then((profile) => {
        logger.log(logger.INFO, 'Profile updated');
        return response.json(profile);
      })
      .catch(next);
  }

  // if it is an object { russia: [moscow, spb, etc] }, update country with cities
  logger.log(logger.INFO, 'Adding cities to existing country - to-visit list');
  const country = Object.keys(locationsToVisit)[0];
  const time = new Date();
  const cities = locationsToVisit[country].split(',').map((city) => {
    return city.trim();
  });

  return Profile.findOneAndUpdate({ _id: request.params.id, 'locationsToVisit.name': country }, {
    $addToSet: { 'locationsToVisit.$.cities': { $each: cities } },
    'locationsToVisit.$.updated': time,
  }, { new: true })
    .then((profile) => {
      logger.log(logger.INFO, 'Profile updated');
      return response.json(profile);
    })
    .catch(next);
});

export default profileRouter;
