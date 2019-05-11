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
PUT /profile/:id - 400 - fails if profile id is incorrect, missing, or if required data is deleted

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
        });
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
              hometown: '28',
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
            .set('Authorization', `Bearer ${mock.account.token}`);
        })
        .then((res) => {
          assert.equal(res.status, 200, 'Profile returned');
          assert.exists(res.body);
          assert.equal(res.body._id, mock.profile._id);
          assert.equal(res.body.firstName, mock.profile.firstName);
          assert.equal(res.body.age, mock.profile.age);
          assert.equal(res.body.hometown, mock.profile.hometown);
        });
    });

    it('should return 401 with no token', function() {
      return superagent.get(`${API_URL}/profile/me`)
        .catch((res) => {
          assert.equal(res.status, 401, 'Unauthorized - no token');
          assert.notExists(res.body);
        });
    });

    it('should return 401 with malformed token', function() {
      return superagent.get(`${API_URL}/profile/me`)
        .set('Authorization', 'Bearer sfdsffsfw32343')
        .catch((res) => {
          assert.equal(res.status, 401, 'Unauthorized - malformed token');
          assert.notExists(res.body);
        });
    });

    it('should return 404 if no profile exists', function() {
      return createAccountMock()
        .then((mock) => {
          return superagent.get(`${API_URL}/profile/me`)
            .set('Authorization', `Bearer ${mock.token}`);
        })
        .catch((res) => {
          assert.equal(res.status, 404, 'Profile not found');
          assert.notExists(res.body);
        });
    });
  });

  describe('PUT /profile/:id', function() {
    // add new country to visit 
    it('should return 200 and updated profile - to visit, new country', function() {
      return createProfileMock(true)
        .then((mock) => {
          return superagent.put(`${API_URL}/profile/${mock.profile._id}`)
            .set('Authorization', `Bearer ${mock.account.token}`)
            .send({
              locationsToVisit: 'china',
            });
        })
        .then((res) => {
          assert.equal(res.status, 200, 'Profile updated - new data added');
          assert.isArray(res.body.locationsToVisit);
          assert.isArray(res.body.locationsVisited);
          assert.lengthOf(res.body.locationsVisited, 2);
          assert.lengthOf(res.body.locationsToVisit, 3);
          assert.equal(res.body.locationsToVisit[2].name, 'china');
          assert.lengthOf(res.body.locationsToVisit[2].cities, 0);
          assert.isNotNull(res.body.locationsToVisit[2].created);
          assert.isNotNull(res.body.locationsToVisit[2].updated);
          assert.equal(res.body.locationsToVisit[2].updated, res.body.locationsToVisit[2].created);
        });
    });

    // add new country visited
    it('should return 200 and updated profile - visited, new country', function() {
      return createProfileMock(false)
        .then((mock) => {
          return superagent.put(`${API_URL}/profile/${mock.profile._id}`)
            .set('Authorization', `Bearer ${mock.account.token}`)
            .send({ 
              locationsVisited: 'russia', 
            });
        })
        .then((res) => {
          assert.equal(res.status, 200, 'Profile updated - new data added');
          assert.isArray(res.body.locationsToVisit);
          assert.isArray(res.body.locationsVisited);
          assert.lengthOf(res.body.locationsVisited, 1);
          assert.lengthOf(res.body.locationsToVisit, 0);
          assert.equal(res.body.locationsVisited[0].name, 'russia');
          assert.lengthOf(res.body.locationsVisited[0].cities, 0);
          assert.isNotNull(res.body.locationsVisited[0].created);
          assert.isNotNull(res.body.locationsVisited[0].updated);
          assert.equal(res.body.locationsVisited[0].updated, res.body.locationsVisited[0].created);
        });
    });

    // add cities to country to visit
    it('should return 200 and updated profile - to visit, add to existing country', function() {
      let country;
      return createProfileMock(true)
        .then((mock) => {
          country = mock.profile.locationsToVisit[0].name;
          return superagent.put(`${API_URL}/profile/${mock.profile._id}`)
            .set('Authorization', `Bearer ${mock.account.token}`)
            .send({
              locationsToVisit: { [country]: 'beijing' },
            });
        })
        .then((res) => {
          assert.equal(res.status, 200, 'Profile updated - data added to existing country');
          assert.lengthOf(res.body.locationsToVisit[0].cities, 3);
          assert.equal(res.body.locationsToVisit[0].cities[2], 'beijing');
          assert.notEqual(res.body.locationsToVisit[0].updated, 
            res.body.locationsToVisit[0].created);
        });
    });

    // add cities to country visited
    it('should return 200 and update profile - visited, add to existing country', function() {
      let country;
      return createProfileMock(true)
        .then((mock) => {
          country = mock.profile.locationsVisited[0].name;
          return superagent.put(`${API_URL}/profile/${mock.profile._id}`)
            .set('Authorization', `Bearer ${mock.account.token}`)
            .send({
              locationsVisited: { [country]: 'beijing' },
            });
        })
        .then((res) => {
          assert.equal(res.status, 200, 'Profile updated - data added to existing country');
          assert.lengthOf(res.body.locationsVisited[0].cities, 3);
          assert.equal(res.body.locationsVisited[0].cities[2], 'beijing');
          assert.notEqual(res.body.locationsVisited[0].updated, 
            res.body.locationsVisited[0].created);
        });
    });

    it('should return simple profile if only simple data is changed', function() {
      return createProfileMock(false)
        .then((mock) => {
          return superagent.put(`${API_URL}/profile/${mock.profile._id}`)
            .set('Authorization', `Bearer ${mock.account.token}`)
            .send({ firstName: 'kris', hometown: 'seattle' });
        })
        .then((res) => {
          assert.equal(res.status, 200, 'Profile updated');
          assert.isObject(res.body);
          assert.isEmpty(res.body.locationsToVisit);
          assert.isEmpty(res.body.locationsVisited);
        });
    });

    it('should return 400 if required data is removed', function() {
      return createProfileMock(false)
        .then((mock) => {
          return superagent.put(`${API_URL}/profile/${mock.profile._id}`)
            .set('Authorization', `Bearer ${mock.account.token}`)
            .send({ age: 29 });
        })
        .catch((res) => {
          assert.equal(res.status, 400, 'Bad Request - removal of required data');
          assert.notExists(res.body);
        });
    });

    it('should return 401 if no token', function() {
      return createProfileMock(false)
        .then((mock) => {
          return superagent.put(`${API_URL}/profile/${mock.profile._id}`)
            .send({ 
              firstName: 'kris',
              hometown: 'seattle',
              locationsVisited: { russia: ['moscow'] }, 
            });
        })
        .catch((res) => {
          assert.equal(res.status, 401, 'Unauthorized - no token');
          assert.notExists(res.body);
        });
    });
  });
});
