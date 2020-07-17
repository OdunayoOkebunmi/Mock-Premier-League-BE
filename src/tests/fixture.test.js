/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../server';
import { fixtureData, userData } from './mockData';

const API_PREFIX = '/api/v1';

let adminUser;
let fixtureSlug;
let fixtureId;

beforeAll(async () => {
  await request(app)
    .post(`${API_PREFIX}/auth/signup`)
    .send(userData[4]);
  adminUser = await request(app)
    .post(`${API_PREFIX}/auth/signin`)
    .send(userData[5]);
});

describe('Test fixture', () => {
  it('should create a fixture succesfully', async (done) => {
    const res = await request(app)
      .post(`${API_PREFIX}/fixture`)
      .send(fixtureData[0])
      .set('Authorization', `Bearer ${adminUser.body.user.token}`);
    expect(res.status).toBe(201);
    expect(typeof res.body).toBe('object');
    expect(res.body.fixture).toHaveProperty('data');
    expect(res.body.fixture.data).toHaveProperty('status');
    fixtureSlug = res.body.fixture.data.slug;
    fixtureId = res.body.fixture.data._id;
    done();
  });
  it('should validate fixture data', async (done) => {
    const res = await request(app)
      .post(`${API_PREFIX}/fixture`)
      .send(fixtureData[1])
      .set('Authorization', `Bearer ${adminUser.body.user.token}`);
    expect(res.status).toBe(400);
    expect(typeof res.body).toBe('object');
    expect(typeof res.body.errors).toBe('object');
    expect(res.body.errors).toHaveProperty('home');

    done();
  });
  it('should get all fixtures', async (done) => {
    const res = await request(app)
      .get(`${API_PREFIX}/fixture`)
      .set('Authorization', `Bearer ${adminUser.body.user.token}`);
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(typeof res.body.fixture).toBe('object');
    expect(typeof res.body.fixture.data).toBe('object');
    done();
  });
  it('should get fixture by slug', async (done) => {
    const res = await request(app)
      .get(`${API_PREFIX}/fixture/${fixtureSlug}`)
      .set('Authorization', `Bearer ${adminUser.body.user.token}`);
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(typeof res.body.fixture).toBe('object');
    done();
  });
  it('should update a fixture', async (done) => {
    const res = await request(app)
      .patch(`${API_PREFIX}/fixture/${fixtureId}`)
      .send(fixtureData[2])
      .set('Authorization', `Bearer ${adminUser.body.user.token}`);
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(typeof res.body.fixture).toBe('object');
    done();
  });
  it('should delete a fixture', async (done) => {
    const res = await request(app)
      .delete(`${API_PREFIX}/fixture/${fixtureId}`)
      .set('Authorization', `Bearer ${adminUser.body.user.token}`);
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(typeof res.body.fixture).toBe('object');
    expect(res.body.fixture.message).toBe('Successfully deleted fixture');
    done();
  });
});
