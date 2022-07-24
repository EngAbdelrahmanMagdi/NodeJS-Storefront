import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import productRouter from './handlers/productHandler';
import userRouter from './handlers/userHandler';
import orderRouter from './handlers/orderHandler';

dotenv.config();

const SERVER_PORT = (process.env.SERVER_PORT as unknown as number) || 3000;

const server: Application = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(morgan('dev'));
userRouter(server);
productRouter(server);
orderRouter(server);

//Morgan package for getting responses

//Main URL

server.get('/', (request: Request, response: Response): void => {
  response.send(
    `<h2> Welcome to Abdelrahman's Application for Storefront </h2>
        `
  );
});
//Routes

//404 Error for NOT FOUND Middleware
server.use((request: Request, response: Response): void => {
  response.status(404).json({ Message: '404 NOT FOUND' });
});

//500 ERROR FOR Error Middleware
server.use(
  (
    error: Error,
    request: Request,
    response: Response,
    next: Function // eslint-disable-line
  ): void => {
    response.status(500).json({ Errors: error.stack });
  }
);

server.listen(3000, function () {
  console.log(`The server is running in Port ${SERVER_PORT}`);
});

export default server;
