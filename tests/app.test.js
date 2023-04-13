const request = require('supertest');

const app = require('../server/app');

describe('Testing api calls', () => {
  it('get /qa/questions', async () => {
    const response = await request(app).get('/qa/questions');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body[0].results)).toBe(true);
  });

  it('get /qa/questions/1/answers', async () => {
    const response = await request(app).get('/qa/questions/1/answers');
    expect(response.statusCode).toBe(200);
    expect(typeof response.body[0].answers).toBe('object');
  });

  it('get qa/questions/1/answers/5/photos', async () => {
    const response = await request(app).get('qa/questions/1/answers/5/photos');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body[0].photos)).toBe(true);
  });
});