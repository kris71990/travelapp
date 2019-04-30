'use strict';

import superagent from 'superagent';
import { assert } from 'chai';
import { startServer, stopServer } from '../lib/server';
import { createAccountMock, removeAccountMock } from './lib/account-mock';

const API_URL = `http://localhost:${process.env.PORT}`;

/* Account Router test coverage - (AUTH REQUIRED)

POST /signup - 200 - success
POST /signup - 400 - fails due to missing required fields
POST /signup - 409 - fails due to duplicate input of unique field

GET /login - 200 - success
GET /login - 400 - fails due to incorrect username or password

*/

describe('Account Router', function() {
  before(startServer);
  after(stopServer);
  afterEach(removeAccountMock);

  describe('POST /signup', function() {
    it('should return 200 status and access token with required data', function() {
      return superagent.post(`${API_URL}/signup`)
        .send({
          username: 'test',
          email: 'test@email.com',
          password: 'password',
        })
        .then((res) => {
          assert.equal(res.status, 200, 'Success');
          assert.isDefined(res.body.token, 'Token exists');
        });
    });
  });
});
