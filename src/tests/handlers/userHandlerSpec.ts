import server from './../../server';
import supertest, { Test, Response } from 'supertest';

const request: supertest.SuperTest<Test> = supertest(server);

describe('User Handler router', () => {
  describe('/Abdelrahman', () => {
    it('404 url not found', async () => {
      const res: Response = await request.get('/Abdelrahman');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /users', () => {
    it('POST /users BAD REQUEST 400', async () => {
      const res: Response = await request.post('/users');
      expect(res.status).toBe(400);
    });
    it('POST /users/make URL NOT FOUND 404', async () => {
      const res: Response = await request.post('/users/make');
      expect(res.status).toBe(404);
    });

    it('PUT /users/1 unauthorized', async () => {
      const res: Response = await request.put('/users/1');
      expect(res.status).toBe(401);
    });

    it('GET /users/500 unauthorized', async () => {
      const res: Response = await request.get('/users/500');
      expect(res.status).toBe(401);
    });
  });

  describe('GET /users unauthorized', () => {
    it('Index Unauthorized', async () => {
      const res: Response = await request.get('/users');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /users/login', () => {
    it('Index Unauthorized', async () => {
      const res: Response = await request.post('/users/login');
      expect(res.status).toBe(200);
    });
  });
});
