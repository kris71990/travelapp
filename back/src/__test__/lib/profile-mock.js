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
        const time = new Date();
        visited = [
          { 
            name: faker.lorem.word(),
            cities: [faker.lorem.word(), faker.lorem.word()],
            updated: time,
            created: time,
          },
          {
            name: faker.lorem.word(),
            cities: [faker.lorem.word(), faker.lorem.word()],
            updated: time,
            created: time,
          },
        ];
        toVisit = [
          { 
            name: faker.lorem.word(),
            cities: [faker.lorem.word(), faker.lorem.word()],
            updated: time,
            created: time,
          },
          {
            name: faker.lorem.word(),
            cities: [faker.lorem.word(), faker.lorem.word()],
            updated: time,
            created: time,
          },
        ];
      }

      return new Profile({
        firstName: faker.name.firstName(),
        age: faker.random.number(),
        hometown: faker.address.state(),
        locationsVisited: visited ? visited : [],
        locationsToVisit: toVisit ? toVisit : [],
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
