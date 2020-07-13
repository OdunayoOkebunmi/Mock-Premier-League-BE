/* eslint-disable import/prefer-default-export */
import faker from 'faker';

export const userData = [
  {
    email: 'admin@mockpl.com',
    password: 'passwordHash',
  },
  {
    email: 'janedoe@gmail.com',
    password: 'passwordHash1',
  },
  {
    username: 'Jane',
    email: 'janedoe@mail.com',
    password: 'passwordHash1',
  },
  {
    email: 'janedoex@gmail.com',
    password: 'passwordHash',
  },
  {
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
];
