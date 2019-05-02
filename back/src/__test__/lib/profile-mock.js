'use strict';

import faker from 'faker';
import Profile from '../../models/profile';
import { createAccountMock, removeAccountMock } from './account-mock';

const createProfileMock = (isActive) => {
  const mock = {};

  return createAccountMock()
    .then((accountMock) => {
      mock.account = accountMock;
      let visited; 
      let toVisit;

      if (isActive) {
        visited = {
          [faker.lorem.word()]: [faker.lorem.word(), faker.lorem.word()],
          [faker.lorem.word()]: [faker.lorem.word(), faker.lorem.word()],
        };
        toVisit = {
          [faker.lorem.word()]: [faker.lorem.word(), faker.lorem.word()],
          [faker.lorem.word()]: [faker.lorem.word(), faker.lorem.word()],
        };
      }

      return new Profile({
        firstName: faker.name.firstName(),
        age: faker.random.number(),
        hometown: faker.address.state(),
        locationsVisited: visited ? visited : {},
        locationsToVisit: toVisit ? toVisit : {},
        account: mock.account.account._id,
      }).save();
    })
    .then((profile) => {
      mock.profile = profile;
      return mock;
    });
};

const removeProfileMock = () => {
  return Promise.all([
    Profile.deleteMany({}),
    removeAccountMock(),
  ]);
};

export { createProfileMock, removeProfileMock };
