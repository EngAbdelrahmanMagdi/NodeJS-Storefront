import server from './../../server';
import supertest, { Test, Response } from 'supertest';

const request: supertest.SuperTest<Test> = supertest(server);

describe('Order Handler Router', () => {
  //SUCCESS TESTS

  describe('SUCCESS TESTS!!', () => {
    it('SUCCESS TESTS!!!', async () => {
      const res: Response = await request.get('/');
      expect(res.status).toBe(200);
    });
  });

  describe('404 NOT FOUND URL', () => {
    it('/Abdelrahman', async () => {
      const res: Response = await request.get('/Abdelrahman');
      expect(res.status).toBe(404);
    });
  });
  describe('GET /orders/user/completed', () => {
    it('index GET /orders/user/completed', async () => {
      const res: Response = await request.get('/orders/user/completed');
      expect(res.status).toBe(401);
    });
    it('GET /orders/completed 404', async () => {
      const res: Response = await request.get('/orders/completed');
      expect(res.status).toBe(404);
    });
  });

  describe('GET /orders/user 401', () => {
    it('index GET', async () => {
      const res: Response = await request.get('/orders/user');
      expect(res.status).toBe(401);
    });
    it('GET /orders/users 404', async () => {
      const res: Response = await request.get('/orders/users');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /orders/create', () => {
    it('POST /orders/create UNAUTHORIZED', async () => {
      const res: Response = await request.post('/orders/create');
      expect(res.status).toBe(401);
    });
    it('POST /orders/createeee UNAUTHORIZED', async () => {
      const res: Response = await request.post('/orders/createeee');
      expect(res.status).toBe(404);
    });
  });
});
