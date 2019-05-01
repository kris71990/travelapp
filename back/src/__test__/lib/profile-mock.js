'use strict';

import faker from 'faker';
import Profile from '../../models/profile';
import { createAccountMock, removeAccountMock } from './account-mock';

const createProfileMock = () => {
  const mock = {};

  return createAccountMock()
    .then((accountMock) => {
      mock.account = accountMock;

      return new Profile({
        firstName: faker.name.firstName(),
        age: faker.random.number(),
        hometown: faker.address.state(),
        account: mock.account.account._id,
      }).save();
    })
    .then((profile) => {
      mock.profile = profile;
      return mock;
    })
};

const removeProfileMock = () => {
  return Promise.all([
    Profile.deleteMany({}),
    removeAccountMock(),
  ])
};

export { createProfileMock, removeProfileMock };
