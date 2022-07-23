import server from './../../server';
import supertest, { Test, Response } from 'supertest';
const request: supertest.SuperTest<Test> = supertest(server);
describe('User Handler router', () => {
  let token = ''; 

beforeAll(async (): Promise<void> => {
  await request.post('/users').send({
    userName: 'Abdo',
    password: 'admin',
    firstName: 'Abdelrahmn',
    lastName: 'Magdy'
  });

  const response: Response = await request.post('/users/login').send({
    userName: 'Abdo',
    password: 'admin',
  });
  token = response.body.token;
});

//SUCCESS TESTS 
// ==================================

    it('POST /users/login', async () => {
      const response: Response = await request.post('/users/login').send({
        userName: 'Abdo',
        password: 'admin',
      });
      expect(response.status).toBe(200);
    });

    it('POST /users', async () => {
      const response: Response = await request.post('/users').send({
        userName: 'Abdo',
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
    });
  
  });
