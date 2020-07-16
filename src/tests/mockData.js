/* eslint-disable import/prefer-default-export */
import faker from 'faker';

export const userData = [
  {
    username: 'admin',
    email: 'admin@mockpl.com',
    password: 'passwordHash1',
    role: 'admin',
  },
  {
    email: 'janedoe@mail.com',
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
    email: 'admin@mockpl.com',
    password: 'passwordHash1',
  },
  {
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
];

export const teamData = [
  {
    name: 'South Hampthon',
  },
  {},
  {
    name: 'North Hampthon',
  },
];
