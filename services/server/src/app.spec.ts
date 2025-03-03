import app from './app';

describe('GET /', () => {
  test('GET /healthz should return status OK', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/healthz',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ok' });
  });

  test('GET /not-implemented-route should return 404 error', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/not-implemented-route',
    });

    expect(response.statusCode).toBe(404);
  });
});
