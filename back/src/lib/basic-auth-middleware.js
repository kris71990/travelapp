'use strict';

import HttpError from 'http-errors';
import Account from '../models/account';

export default (request, response, next) => {
  if (!request.headers.authorization) next(new HttpError(400, 'AUTH - invalid request'));

  const base64AuthHeader = request.headers.authorization.split('Basic ')[1];
  if (!base64AuthHeader) next(new HttpError(400, 'AUTH - invalid request'));

  const stringAuthHeader = Buffer.from(base64AuthHeader, 'base64').toString();
  const [username, password] = stringAuthHeader.split(':');

  if (!username || !password) next(new HttpError(400, 'AUTH - invalid request'));

  return Account.findOne({ username })
    .then((account) => {
      if (!account) {
        return next(new HttpError(400, 'AUTH -invalid request'));
      }
      return account.verifyPassword(password);
    })
    .then((account) => {
      request.account = account;
      return next();
    })
    .catch(next);
};
