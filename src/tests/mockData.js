/* eslint-disable import/prefer-default-export */
import faker from 'faker';

export const userData = [
  {
    username: 'newUser',
    email: 'newuser@mail.com',
    password: 'passwordHash1',
    role: 'regular',
  },
  {
    email: 'newuser@mail.com',
    password: 'passwordHash1',
  },
  {
    username: 'Team Admin',
    email: 'teamadmin@mail.com',
    password: 'passwordHash1',
    role: 'admin',
  },
  {
    email: 'teamadmin@mail.com',
    password: 'passwordHash1',
  },
  {
    username: 'Fixture Admin',
    email: 'fixtureadmin@mail.com',
    password: 'passwordHash1',
    role: 'admin',
  },
  {
    email: 'fixtureadmin@mail.com',
    password: 'passwordHash1',
  },

  {
    email: 'janedoex@gmail.com',
    password: 'passwordHash',
  },
  {
    password: faker.internet.password(),
    email: faker.internet.email(),
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
export const fixtureData = [
  {
    time: '2020-11-06T20:37:53.667Z',
    home: 'Lemke Club',
    away: 'Blandachester',
    location: 'Throughway',
    status: 'pending',
  },
  {
    time: '2020-11-06T20:37:53.667Z',
    away: 'Blandachester',
    location: 'Throughway',
    status: 'pending',
  },
  {
    time: '2020-11-06T20:37:53.667Z',
    home: 'Lemke Club',
    away: 'Machester',
    location: 'Throughway',
    status: 'completed',
  },
];
