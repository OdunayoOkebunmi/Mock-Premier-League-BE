/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../server';
import { teamData, userData } from './mockData';

const API_PREFIX = '/api/v1';

let adminUser;
let teamId;

beforeAll(async () => {
  await request(app)
    .post(`${API_PREFIX}/auth/signup`)
    .send(userData[2]);
  adminUser = await request(app)
    .post(`${API_PREFIX}/auth/signin`)
    .send(userData[1]);
});

describe('Test team', () => {
  it('should create a team succesfully', async (done) => {
    const res = await request(app)
      .post(`${API_PREFIX}/team`)
      .send(teamData[0])
      .set('Authorization', `Bearer ${adminUser.body.user.token}`);
    expect(res.status).toBe(201);
    expect(typeof res.body).toBe('object');
    expect(res.body.team).toHaveProperty('data');
    expect(res.body.team.data).toHaveProperty('name');
    teamId = res.body.team.data._id;

    done();
  });
  it('should validate team data', async (done) => {
    const res = await request(app)
      .post(`${API_PREFIX}/team`)
      .send(teamData[1])
      .set('Authorization', `Bearer ${adminUser.body.user.token}`);
    expect(res.status).toBe(400);
    expect(typeof res.body).toBe('object');
    expect(typeof res.body.errors).toBe('object');
    expect(res.body.errors).toHaveProperty('name');

    done();
  });
  it('should get all teams', async (done) => {
    const res = await request(app)
      .get(`${API_PREFIX}/team`)
      .set('Authorization', `Bearer ${adminUser.body.user.token}`);
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(typeof res.body.team).toBe('object');
    expect(typeof res.body.team.data).toBe('object');
    done();
  });
  it('should get one team', async (done) => {
    const res = await request(app)
      .get(`${API_PREFIX}/team/${teamId}`)
      .set('Authorization', `Bearer ${adminUser.body.user.token}`);
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(typeof res.body.team).toBe('object');
    done();
  });
  it('should update a team', async (done) => {
    const res = await request(app)
      .put(`${API_PREFIX}/team/${teamId}`)
      .send(teamData[2])
      .set('Authorization', `Bearer ${adminUser.body.user.token}`);
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(typeof res.body.team).toBe('object');
    done();
  });
  it('should delete a team', async (done) => {
    const res = await request(app)
      .delete(`${API_PREFIX}/team/${teamId}`)
      .set('Authorization', `Bearer ${adminUser.body.user.token}`);
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(typeof res.body.team).toBe('object');
    expect(res.body.team.message).toBe('Successfully deleted team');
    done();
  });
});
