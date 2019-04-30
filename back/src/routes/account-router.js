'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';

import Account from '../models/account';
import logger from '../lib/logger';
import basicAuthMiddleware from '../lib/basic-auth-middleware';

const accountRouter = new Router();
const jsonParser = json();

accountRouter.post('/signup', jsonParser, (request, response, next) => {
  const { username, email } = request.body;
  if (!username || !email || !request.body.password) return next(new HttpError(400, 'Bad Request'));

  logger.log(logger.INFO, 'Processing a post on /signup');

  return Account.create(username, email, request.body.password)
    .then((account) => {
      delete request.body.password; 
      logger.log(logger.INFO, 'Creating token...');
      return account.createToken();
    })
    .then((token) => {
      logger.log(logger.INFO, 'Returning token');
      response.cookie('travel-token', token, { maxAge: 9000000 });
      return response.json({ token });
    })
    .catch(next);
});

accountRouter.get('/login', basicAuthMiddleware, (request, response, next) => {
  if (!request.account) return next(new HttpError(400, 'No Account'));
  return request.account.createToken()
    .then((token) => {
      logger.log(logger.INFO, 'Returning token');
      response.cookie('travel-token', token, { maxAge: 9000000 });
      return response.json({ token });
    })
    .catch(next);
});

export default accountRouter;
