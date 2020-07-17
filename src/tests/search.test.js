/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../server';
import { userData } from './mockData';

const API_PREFIX = '/api/v1';

let adminUser;
let team1;
let team2;

beforeAll(async () => {
  await request(app)
    .post(`${API_PREFIX}/auth/signup`)
    .send(userData[2]);
  adminUser = await request(app)
    .post(`${API_PREFIX}/auth/signin`)
    .send(userData[3]);
});

describe('Test fixture', () => {
  it('should create the first team succesfully', async (done) => {
    const res = await request(app)
      .post(`${API_PREFIX}/team`)
      .send({ name: 'Team A' })
      .set('Authorization', `Bearer ${adminUser.body.user.token}`);
    expect(res.status).toBe(201);
    expect(typeof res.body).toBe('object');
    expect(res.body.team).toHaveProperty('data');
    expect(res.body.team.data).toHaveProperty('name');
    team1 = res.body.team.data.name;

    done();
  });
  it('should create the second team succesfully', async (done) => {
    const res = await request(app)
      .post(`${API_PREFIX}/team`)
      .send({ name: 'Team B' })
      .set('Authorization', `Bearer ${adminUser.body.user.token}`);
    expect(res.status).toBe(201);
    expect(typeof res.body).toBe('object');
    expect(res.body.team).toHaveProperty('data');
    expect(res.body.team.data).toHaveProperty('name');
    team2 = res.body.team.data.name;

    done();
  });
  it('should create a fixture succesfully', async (done) => {
    const res = await request(app)
      .post(`${API_PREFIX}/fixture`)
      .send({
        time: '2020-11-06T20:37:53.667Z',
        home: team1,
        away: team2,
        location: 'Throughway',
        status: 'pending',
      })
      .set('Authorization', `Bearer ${adminUser.body.user.token}`);
    expect(res.status).toBe(201);
    expect(typeof res.body).toBe('object');
    expect(res.body.fixture).toHaveProperty('data');
    expect(res.body.fixture.data).toHaveProperty('status');
    done();
  });
  it('should get all fixtures', async (done) => {
    const res = await request(app)
      .get(`${API_PREFIX}/search?name=${team1}`)
      .set('Authorization', `Bearer ${adminUser.body.user.token}`);
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(typeof res.body.teamDetails).toBe('object');
    expect(res.body.teamDetails).toHaveProperty('data');
    expect(res.body.teamDetails.data).toHaveProperty('team');
    expect(res.body.teamDetails.data).toHaveProperty('fixtures');
    done();
  });
});
