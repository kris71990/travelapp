'use strict';

import superagent from 'superagent';
import { assert } from 'chai';
import { startServer, stopServer } from '../lib/server';
import { createAccountMock } from './lib/account-mock';
import { createProfileMock, removeProfileMock } from './lib/profile-mock';

const API_URL = `http://localhost:${process.env.PORT}`;

/* Profile Router test coverage (AUTH REQUIRED)

POST /profile - 200 - success
POST /profile - 400 - fails if missing required data
POST /profile - 401 - fails if missing account authentication token
POST /profile - 409 - fails if user profile already exists

GET /profile/me - 200 - success
GET /profile/me - 401 - fails if missing account authentication token
GET /profile/me - 404 - fails if account does not exist

PUT /profile/:id - 200 - success (adding data, and creating new data)
PUT /profile/:id - 401 - fails if missing account authentication token
TODO --- PUT /profile/:id - 400 - fails if profile id is incorrect, missing, or if required data is deleted

TODO --- DELETE /profile/:id - 200 - success
TODO --- DELETE /profile/:id - 401 fails if missing account auth token
TODO --- DELETE /profile/:id - 404 fails if incorrect id

*/

describe('Profile Router', function() {
  before(startServer);
  after(stopServer);
  afterEach(removeProfileMock);

  describe('POST /profile', function() {
    it('should return 200 status and profile with authentication', function() {
      return createAccountMock()
        .then((mock) => {
          return superagent.post(`${API_URL}/profile`)
            .set('Authorization', `Bearer ${mock.token}`)
            .send({
              firstName: 'Joe',
              age: '28',
              hometown: 'Seattle',
            });
        })
        .then((res) => {
          assert.equal(res.status, 200, 'Profile Created');
          assert.exists(res.body);
          assert.equal(res.body.firstName, 'Joe');
          assert.equal(res.body.age, '28');
          assert.equal(res.body.hometown, 'Seattle');
        })
    });

    it('should return 400 status if profile missing first name', function() {
      return createAccountMock()
        .then((mock) => {
          return superagent.post(`${API_URL}/profile`)
            .set('Authorization', `Bearer ${mock.token}`)
            .send({
              age: '28',
              hometown: 'Seattle',
            });
        })
        .catch((res) => {
          assert.equal(res.status, 400, 'Bad Request - no first name');
          assert.notExists(res.body);
        });
    });

    it('should return 400 status if profile missing hometown', function() {
      return createAccountMock()
        .then((mock) => {
          return superagent.post(`${API_URL}/profile`)
            .set('Authorization', `Bearer ${mock.token}`)
            .send({
              firstName: 'Kris',
              age: '28',
            });
        })
        .catch((res) => {
          assert.equal(res.status, 400, 'Bad Request - no hometown');
          assert.notExists(res.body);
        });
    });

    it('should return 401 status if authentication fails', function() {
      return superagent.post(`${API_URL}/profile`)
        .send({
          firstName: 'Kris',
          age: '28',
          hometown: 'Seattle',
        })
        .catch((res) => {
          assert.equal(res.status, 401, 'Unauthorized - no token');
          assert.notExists(res.body);
        });
    });

    it('should return 409 if profile already exists', function() {
      return createProfileMock(false)
        .then((mock) => {
          return superagent.post(`${API_URL}/profile`)
            .set('Authorization', `Bearer ${mock.account.token}`)
            .send({
              firstName: 'Kris',
              age: '28',
              hometown: '28'
            });
        })
        .catch((res) => {
          assert.equal(res.status, 409, 'Conflict - profile already exists');
          assert.notExists(res.body);
        });
    });
  });

  describe('GET /profile/me', function() {
    it('should return 200 and profile', function() {
      let mock;
      return createProfileMock(false)
        .then((profileMock) => {
          mock = profileMock;
          return superagent.get(`${API_URL}/profile/me`)
            .set('Authorization', `Bearer ${mock.account.token}`)
        })
        .then((res) => {
          assert.equal(res.status, 200, 'Profile returned');
          assert.exists(res.body);
          assert.equal(res.body._id, mock.profile._id);
          assert.equal(res.body.firstName, mock.profile.firstName);
          assert.equal(res.body.age, mock.profile.age);
          assert.equal(res.body.hometown, mock.profile.hometown);
        })
    });

    it('should return 401 with no token', function() {
      return superagent.get(`${API_URL}/profile/me`)
        .catch((res) => {
          assert.equal(res.status, 401, 'Unauthorized - no token');
          assert.notExists(res.body);
        })
    })

    it('should return 404 if no profile exists', function() {
      return createAccountMock()
        .then((mock) => {
          return superagent.get(`${API_URL}/profile/me`)
            .set('Authorization', `Bearer ${mock.token}`)
        })
        .catch((res) => {
          assert.equal(res.status, 404, 'Profile not found');
          assert.notExists(res.body);
        });
    });
  });

  describe('PUT /profile/:id', function() {
    it('should return 200 and updated profile (when location data exists)', function() {
      return createProfileMock(true)
        .then((mock) => {
          return superagent.put(`${API_URL}/profile/${mock.profile._id}`)
            .set('Authorization', `Bearer ${mock.account.token}`)
            .send({
              firstName: 'kris',
              hometown: 'seattle',
              locationsToVisit: {
                'china': ['beijing'],
              }
            });
        })
        .then((res) => {
          assert.equal(res.status, 200, 'Profile updated - data added');
          assert.isObject(res.body.locationsToVisit);
          assert.isObject(res.body.locationsVisited);
          assert.lengthOf(Object.keys(res.body.locationsVisited), 2);
          assert.lengthOf(Object.keys(res.body.locationsToVisit), 3);
          assert.property(res.body.locationsToVisit, 'china');
          assert.equal(res.body.locationsToVisit['china'][0], ['beijing'])
        });
    });

    it.only('should return 200 and updated profile (with new location data)', function() {
      return createProfileMock(false)
        .then((mock) => {
          return superagent.put(`${API_URL}/profile/${mock.profile._id}`)
            .set('Authorization', `Bearer ${mock.account.token}`)
            .send({ 
              firstName: 'kris',
              hometown: 'seattle',
              locationsVisited: { 'russia': ['moscow'] } 
            });
        })
        .then((res) => {
          assert.equal(res.status, 200, 'Profile updated - new data');
          assert.isObject(res.body.locationsVisited);
          assert.notExists(res.body.locationsToVisit);
          assert.lengthOf(res.body.locationsVisited['russia'], 1);
          assert.hasAllKeys(res.body.locationsVisited, ['russia']);
          assert.propertyVal(res.body.locationsVisited, 'russia', ['moscow'])
        })
    });

    it('should return 401 if no token', function() {
      return createProfileMock(false)
        .then((mock) => {
          return superagent.put(`${API_URL}/profile/${mock.profile._id}`)
            .send({ locationsVisited: { 'russia': ['moscow'] } });
        })
        .catch((res) => {
          assert.equal(res.status, 401, 'Unauthorized - no token');
          assert.notExists(res.body);
        })
    });
  });
});
