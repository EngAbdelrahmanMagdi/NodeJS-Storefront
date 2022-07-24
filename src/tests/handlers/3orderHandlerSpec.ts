import server from '../../server';
import supertest, { Test, Response } from 'supertest';
import jwt from 'jsonwebtoken';

const request: supertest.SuperTest<Test> = supertest(server);

const newUser = {
  id: 1,
  userName: 'Abdo',
  password: 'admin',
  firstName: 'Abdo',
  lastName: 'Magdy',
};

const token = jwt.sign(newUser, process.env.PRIVATE_KEY as string);

describe('Order Handler Router', () => {
  //SUCCESS TESTS

  it('POST /orders/create ', async () => {
    const res: Response = await request
      .post('/orders/create/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'pending',
        products: [
          { product_id: 1, order_id: 1, quantity: 5 },
          { product_id: 1, order_id: 1, quantity: 5 },
        ],
      })
      .expect(200);
  });
  //get current status 200
  it('index GET CURRENT', async () => {
    const res: Response = await request
      .get('/orders/user/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  //get completed route status 200

  it('index GET /orders/user/completed 200 STATUS success', async () => {
    const res: Response = await request
      .get('/orders/user/completed/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('Home url test', async () => {
    const res: Response = await request.get('/');
    expect(res.status).toBe(200);
  });
});

describe('Fail tests', () => {
  it('/Abdelrahman', async () => {
    const res: Response = await request.get('/Abdelrahman');
    expect(res.status).toBe(404);
  });

  it('GET /orders/completed 404', async () => {
    const res: Response = await request.get('/orders/completed').expect(404);
  });

  it('GET /orders/users 404', async () => {
    const res: Response = await request.get('/orders/users');
    expect(res.status).toBe(404);
  });
  it('POST /orders/createeee UNAUTHORIZED', async () => {
    const res: Response = await request.post('/orders/createeee');
    expect(res.status).toBe(404);
  });
});
