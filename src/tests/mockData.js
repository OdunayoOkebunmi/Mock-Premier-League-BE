/* eslint-disable import/prefer-default-export */
import faker from 'faker';
import { hashPassword } from '../middleware/authentication';

export const userData = [
  {
    username: 'admin',
    email: 'admin@mockpl.com',
    password: hashPassword('passwordHash'),
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
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
];
