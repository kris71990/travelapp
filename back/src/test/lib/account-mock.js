'use strict';

import faker from 'faker';
import Account from '../../models/account';

const createAccountMock = () => {
  const mock = {};
  
  mock.request = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.lorem.words(2),
  };

  return Account.create(
    mock.request.username, mock.request.email, mock.request.password,
  )
    .then((account) => {
      mock.account = account;
      return account.createToken();
    })
    .then((token) => {
      mock.token = token;
      return Account.findById(mock.account.id);
    })
    .then((account) => {
      mock.account = account;
      return mock;
    });
};

const removeAccountMock = () => Account.deleteMany({});

export { createAccountMock, removeAccountMock };
