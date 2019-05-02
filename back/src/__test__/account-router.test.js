'use strict';

import superagent from 'superagent';
import { assert } from 'chai';
import { startServer, stopServer } from '../lib/server';
import { createAccountMock, removeAccountMock } from './lib/account-mock';

const API_URL = `http://localhost:${process.env.PORT}`;

/* Account Router test coverage - (AUTH REQUIRED)

POST /signup - 200 - success (1)
POST /signup - 400 - fails due to missing required fields (3)
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

    it('should return 400 if username is missing', function() {
      return superagent.post(`${API_URL}/signup`)
        .send({
          email: 'test@email.com',
          password: 'password',
        })
        .catch((res) => {
          assert.equal(res.status, 400, 'Bad Request - no username');
          assert.notExists(res.body);
        });
    });
  
    it('should return 400 if email is missing', function() {
      return superagent.post(`${API_URL}/signup`)
        .send({
          username: 'test',
          password: 'password',
        })
        .catch((res) => {
          assert.equal(res.status, 400, 'Bad Request - no email');
          assert.notExists(res.body);
        });
    });
  
    it('should return 400 if password is missing', function() {
      return superagent.post(`${API_URL}/signup`)
        .send({
          username: 'test',
          email: 'test@test.com',
        })
        .catch((res) => {
          assert.equal(res.status, 400, 'Bad Request - no password');
          assert.notExists(res.body);
        });
    });
  
    it('should return 409 if username already exists', function() {
      return createAccountMock()
        .then((accountMock) => {
          return superagent.post(`${API_URL}/signup`)
            .send({
              username: accountMock.request.username,
              email: 'test@test.com',
              password: 'password',
            })
            .catch((res) => {
              assert.equal(res.status, 409, 'Conflict - Username already exists');
              assert.notExists(res.body);
            });
        });
    });
  
    it('should return 409 if email already exists', function() {
      return createAccountMock()
        .then((accountMock) => {
          return superagent.post(`${API_URL}/signup`)
            .send({
              username: 'test',
              email: accountMock.request.email,
              password: 'password',
            })
            .catch((res) => {
              assert.equal(res.status, 409, 'Conflict - Email already exists');
              assert.notExists(res.body);
            });
        });
    });
  });

  describe('GET /login', function() {
    it('should return 200 for successful login with token', function() {
      return createAccountMock()
        .then((accountMock) => {
          return superagent.get(`${API_URL}/login`)
            .auth(accountMock.request.username, accountMock.request.password)
            .then((res) => {
              assert.equal(res.status, 200, 'Successful login');
              assert.isDefined(res.body.token, 'Token returned');
            });
        });
    });

    it('should return 400 if username is wrong', function() {
      return createAccountMock()
        .then((accountMock) => {
          return superagent.get(`${API_URL}/login`)
            .auth('bad_username', accountMock.request.password)
            .catch((res) => {
              assert.equal(res.status, 400, 'Login failed - incorrect username');
              assert.notExists(res.body);
            });
        });
    });

    it('should return 400 if password is wrong', function() {
      return createAccountMock()
        .then((accountMock) => {
          return superagent.get(`${API_URL}/login`)
            .auth(accountMock.request.username, 'bad_password')
            .catch((res) => {
              assert.equal(res.status, 400, 'Login failed - incorrect password');
              assert.notExists(res.body);
            });
        });
    });

    it('should return 400 if no credentials', function() {
      return superagent.get(`${API_URL}/login`)
        .catch((res) => {
          assert.equal(res.status, 400, 'Login failed - no credentials');
          assert.notExists(res.body);
        });
    });

    it('should return 401 with malformed token', function() {
      return superagent.get(`${API_URL}/profile/me`)
        .set('Authorization', `Bearer sfdsffsfw32343`) // eslint-disable-line
        .catch((res) => {
          assert.equal(res.status, 401, 'Unauthorized - malformed token');
          assert.notExists(res.body);
        });
    });
  });

  describe('Catch All', function() {
    it('should return 404 for non-existent route', function() {
      return superagent.get(`${API_URL}/fakeroute`)
        .catch((res) => {
          assert.equal(res.status, 404, 'Route not found - Catch All');
        });
    });
  });
});
