import request from 'supertest';
import app from '../../server';
import { userData } from '../mockData';

const API_PREFIX = '/api/v1/auth';


describe('Test user signup', () => {
  it('should create a user succesfully', async (done) => {
    const res = await request(app).post(`${API_PREFIX}/signup`).send(userData[4]);
    expect(res.status).toBe(201);
    expect(typeof res.body).toBe('object');
    expect(res.body.user).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('message');
    done();
  });
  it('should validate user data', async (done) => {
    const res = await request(app).post(`${API_PREFIX}/signup`).send(userData[3]);
    expect(res.status).toBe(400);
    expect(typeof res.body).toBe('object');
    expect(typeof res.body.errors).toBe('object');
    expect(res.body.errors).toHaveProperty('username');
    done();
  });
  it('should signin an existing user', async (done) => {
    const res = await request(app).post(`${API_PREFIX}/signin`).send(userData[0]);
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(res.body.user).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('message');
    done();
  });
  it('should validate user data', async (done) => {
    const res = await request(app).post(`${API_PREFIX}/signin`).send(userData[3]);
    expect(res.status).toBe(404);
    expect(typeof res.body).toBe('object');
    expect(typeof res.body.errors).toBe('object');
    expect(res.body.errors).toHaveProperty('message');
    expect(res.body.errors.message).toBe('User with the email does not exist');
    done();
  });
});
