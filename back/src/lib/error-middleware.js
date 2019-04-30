'use strict';

import logger from './logger';

export default (error, request, response, next) => { // eslint-disable-line no-unused-vars
  logger.log(logger.ERROR, '-- ERROR_MIDDLEWARE --');
  logger.log(logger.ERROR, error);

  if (error.status) {
    logger.log(logger.INFO, `Responding with a ${error.status} code and message ${error.message}`);
    return response.sendStatus(error.status);
  }

  const errorMessage = error.message.toLowerCase();

  if (errorMessage.includes('unauthorized') || errorMessage.includes('jwt malformed')) {
    logger.log(logger.INFO, 'Responding with 401 code - unauthorized');
    return response.sendStatus(401);
  }

  if (errorMessage.includes('objectid failed')) {
    logger.log(logger.INFO, 'Responding with a 400 code - bad request');
    return response.sendStatus(404);
  }

  if (errorMessage.includes('duplicate key')) {
    logger.log(logger.INFO, 'Responding with a 409 code - conflict');
    return response.sendStatus(409);
  }
  
  logger.log(logger.ERROR, 'Responding with a 500 error code - internal server error');
  logger.log(logger.ERROR, error);
  return response.sendStatus(500);
};
