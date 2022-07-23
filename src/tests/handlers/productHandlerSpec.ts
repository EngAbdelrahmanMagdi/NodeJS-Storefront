import server from './../../server';
import supertest, { Test, Response } from 'supertest';

const request: supertest.SuperTest<Test> = supertest(server);

describe('Product Handler Router', () => {
  //test for SUCCESS

  describe('SUCCESS TESTS!!', () => {
    it('SUCCESS TESTS!!!', async () => {
      const res: Response = await request.get('/');
      expect(res.status).toBe(200);
    });
  });

  describe('TEST SUCCESS!!!!!!!!!!!!!!!!', () => {
    //test for SUCCESS

    it('index GET', async () => {
      const res: Response = await request.get('/products');
      expect(res.status).toBe(200);
    });
    it('index GET', async () => {
      const res: Response = await request.get('/products/category/IPHONE');
      expect(res.status).toBe(200);
    });
  });

  describe('404 NOT FOUND URL', () => {
    it('/Abdelrahman', async () => {
      const res: Response = await request.get('/Abdelrahman');
      expect(res.status).toBe(404);
    });
  });
  describe('GET /products 200', () => {
    it('index GET /produc(t) 404', async () => {
      const res: Response = await request.get('/product/category/abdelrahman');
      expect(res.status).toBe(404);
    });
    it('index GET /produc(t) 404', async () => {
      const res: Response = await request.get('/product');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /products/create', () => {
    it('POST /products/create UNAUTHORIZED', async () => {
      const res: Response = await request.post('/products/create');
      expect(res.status).toBe(401);
    });
  });

  describe('GET /products/:id', () => {
    it('GET specific Product /products/:id', async () => {
      const res: Response = await request.get('/products/1');
      expect(res.status).toBe(200);
    });
  });

  describe('PUT /products/update/:id', () => {
    it('PUT /products/update/1 unauthorized', async () => {
      const res: Response = await request.put('/products/update/1');
      expect(res.status).toBe(401);
    });
  });

  describe('DELETE /products/:id', () => {
    it('DELETE /products/1 unauthorized', async () => {
      const res: Response = await request.delete('/products/1');
      expect(res.status).toBe(401);
    });
  });
});
