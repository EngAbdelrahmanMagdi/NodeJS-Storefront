import { Order } from '../../models/order';
import { OrderProductsType } from '../../types/types';

const order = new Order();

describe('Test Order Model methods', () => {
  it('createOrder method test its return', async () => {
    const result = {
      user_id: 1,
      status: 'fulfilled',
      products: [
        {
          product_id: 1,
          order_id: 1,
          quantity: 50,
        },
      ],
    };
    const resultedOrder = await order.createOrder(result);
    expect(resultedOrder).toBeDefined();
    expect(resultedOrder).toBeInstanceOf(Object);
  });

  it('showUserFulfilledOrders method brings the completed orders', async () => {
    const result: OrderProductsType[] = await order.showUserFulfilledOrders(1);
    expect(result).toBeInstanceOf(Array);
  });

  it('showCurrentUserOrder method brings the current orders', async () => {
    const result: OrderProductsType = await order.showCurrentUserOrder(1);
    expect(result).toBeInstanceOf(Object);
  });

  it('createOrder method test in should be defined', () => {
    expect(order.createOrder).toBeDefined();
  });
  it('showUserFulfilledOrders method should be defined', () => {
    expect(order.showUserFulfilledOrders).toBeDefined();
  });

  it('showCurrentUserOrder method should be defined', () => {
    expect(order.showCurrentUserOrder).toBeDefined();
  });
});
