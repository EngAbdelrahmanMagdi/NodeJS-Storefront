import { Order } from '../models/order';
import { OrderType } from '../types/types';
import { Application, Request, Response } from 'express';
import { verifyToken } from './userHandler';

const orderInstance = new Order();

const createOrder = async (request: Request, response: Response) => {
  try {
    const orderData: OrderType = {
      // user_id: response.locals.auth.user.id,
      user_id: request.params.id as unknown as number,
      status: request.body.status,
      products: request.body.products,
    };
    //console.log(orderData);
    //console.log(orderData.user_id);
    if (
      !orderData.products ||
      !orderData.status.match(/^(pending|fulfilled)$/)
    ) {
      response.status(400).send('Product data and Order Status are required!!');
      return;
    }
    const newOrder = await orderInstance.createOrder(orderData);
    //console.log(newOrder);
    response.json({ order: newOrder.products });
  } catch (err) {
    response.status(400).json({ message: err });
  }
};
const showUserFulfilledOrders = async (
  request: Request,
  response: Response
) => {
  try {
    const userId = request.params.id as unknown as number;
    // const userId = response.locals.auth.user.id;
    const userOrders = await orderInstance.showUserFulfilledOrders(userId);
    response.json({ userCompletedOrders: userOrders });
  } catch (err) {
    response.status(400).json({ message: err });
  }
};

const showCurrentUserOrder = async (request: Request, response: Response) => {
  try {
    // const userId = response.locals.auth.user.id;
    const userId = request.params.id as unknown as number;
    const userOrder = await orderInstance.showCurrentUserOrder(userId);
    response.json({ userCurrentOrder: userOrder });
  } catch (err) {
    response.status(400).json({ message: err });
  }
};

const orderRouter = (app: Application) => {
  app.post('/orders/create/:id', verifyToken, createOrder);
  app.get('/orders/user/completed/:id', verifyToken, showUserFulfilledOrders);
  app.get('/orders/user/:id', verifyToken, showCurrentUserOrder);
};

export default orderRouter;
