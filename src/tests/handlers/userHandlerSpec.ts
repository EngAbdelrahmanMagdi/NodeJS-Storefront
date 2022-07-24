import server from './../../server';
import supertest, { Test, Response } from 'supertest';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user';

const user = new User();
const request: supertest.SuperTest<Test> = supertest(server);


const newUser = {
  userName:'Abdo',
  password: 'admin',
  firstName: 'Abdo',
  lastName: 'Magdy',
};

const token = jwt.sign(newUser, process.env.PRIVATE_KEY as string);

describe('User Handler router', () => {

  //SUCCESS TESTS
  // ==================================

  it('POST /users', async () => {
    const response: Response = await request.post('/users').type('form').send({
      userName: 'Abdo',
      password: 'admin',
      firstName: 'Abdelrahman',
      lastName: 'Magdy',
    }).expect(200)
  });
  it('POST /users/login', async () => {
    const response: Response = await request
      .post('/users/login')
      .send({
        userName: 'Abdo',
        password: 'admin',
      })
      .expect(200)
  });

  
  it('GET /users', async () => {
    const response: Response = await request
      .get('/users')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('GET /users/1', async () => {
    const response: Response = await request
      .get('/users')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('PUT /users/1', async () => {
    const response: Response = await request
      .put('/users/1')
      .set('Authorization', 'Bearer ' + token)
      .send({
        userName: 'Alaa',
        password: 'admin',
        firstName: 'Abdelrahman',
        lastName: 'Magdy',
      });
    expect(response.status).toBe(200);
  });


  it('Main URL', async () => {
    const res: Response = await request.get('/');
    expect(res.status).toBe(200);
  });

  // ===========================================================

  //Failed tests

  it('404 url not found', async () => {
    const res: Response = await request.get('/Abdelrahman');
    expect(res.status).toBe(404);
  });

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

  it('Index Unauthorized', async () => {
    const res: Response = await request.get('/users');
    expect(res.status).toBe(401);
  });

  it('Index Unauthorized', async () => {
    const res: Response = await request.post('/users/login');
    expect(res.status).toBe(400);
  })
});
