import request from 'supertest';

import app from '../server';

const wrongUrl = '/api/v1/wrongurl';
const url = '/';

describe('Tests for When Endpoint does not exist', () => {
  it('should throw an error when wrong endpoint is used', async (done) => {
    const res = await request(app).get(wrongUrl);
    expect(res.status).toBe(404);
    expect(typeof res.body).toBe('object');
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Page not found');
    done();
  });
  it('should get url successfully', async (done) => {
    const res = await request(app).get(url);
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Welcome to Mock Premier League API');
    done();
  });
});
