import server from '../../server';
import supertest, { Test, Response } from 'supertest';
import jwt from 'jsonwebtoken';

const request: supertest.SuperTest<Test> = supertest(server);

const newUser = {
  userName: 'Abdo',
  password: 'admin',
  firstName: 'Abdo',
  lastName: 'Magdy',
};

const token = jwt.sign(newUser, process.env.PRIVATE_KEY as string);

//SUCCESS TESTS !!

describe('Product Handler Router', () => {
  describe('POST /products/create', () => {
    it('POST /products/create UNAUTHORIZED', async () => {
      const res: Response = await request
        .post('/products/create')
        .type('form')
        .send({
          name: 'OPPO',
          category: 'Mobile',
          price: 5000,
        });
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
      const res: Response = await request
        .put('/products/update/1')
        .set('Authorization', 'Bearer ' + token)
        .send({
          name: 'OPPO',
          category: 'Mobile',
          price: 5000,
        })
        .expect(200);
    });
  });

  describe('DELETE /products/:id', () => {
    it('DELETE /products/1 unauthorized', async () => {
      const res: Response = await request
        .delete('/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
  });
  describe('TEST SUCCESS', () => {
    //test for SUCCESS

    it('index GET', async () => {
      const res: Response = await request.get('/products');
      expect(res.status).toBe(200);
    });
    it('index GET', async () => {
      const res: Response = await request.get('/products/1');
      expect(res.status).toBe(200);
    });
    it('index GET', async () => {
      const res: Response = await request.get('/products/category/IPHONE');
      expect(res.status).toBe(200);
    });
  });
  describe('Main URL', () => {
    it('Home url test', async () => {
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
});
