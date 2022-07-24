import server from '../../server';
import supertest, { Test, Response } from 'supertest';
import { Secret, verify } from 'jsonwebtoken';
import { UserType } from '../../types/types';

const privateKey = process.env.PRIVATE_KEY as Secret;
const request: supertest.SuperTest<Test> = supertest(server);

let token: string;
let newUserID: number;

const newUser: UserType = {
  userName: 'Abdo',
  password: 'admin',
  firstName: 'Abdo',
  lastName: 'Magdy',
};

describe('Order Handler Router', () => {
  //SUCCESS TESTS
  it('Home url test', async () => {
    const res: Response = await request.get('/');
    expect(res.status).toBe(200);
  });

  it('POST /orders/createeee UNAUTHORIZED', async () => {
    const res: Response = await request.post('/orders/createeee');
    expect(res.status).toBe(404);
  });
});

describe('404 NOT FOUND URL', () => {
  it('/Abdelrahman', async () => {
    const res: Response = await request.get('/Abdelrahman');
    expect(res.status).toBe(404);
  });
});
describe('GET /orders/user/completed', () => {
  it('GET /orders/completed 404', async () => {
    const res: Response = await request.get('/orders/completed').expect(404);
  });
});

describe('GET /orders/user 200', () => {
  it('GET /orders/users 404', async () => {
    const res: Response = await request.get('/orders/users');
    expect(res.status).toBe(404);
  });
});
