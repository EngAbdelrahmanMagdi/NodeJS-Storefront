import Client from '../database';
import { ProductsOrder } from './productsOrder';
import { OrderProductsType, OrderType } from '../types/types';

const newOrderProducts = new ProductsOrder();
//here we used inside Order Type, ProductsOrder
export class Order {
  async createOrder(order: OrderType): Promise<OrderType> {
    try {
      const conn = await Client.connect();
      const sqlQuery =
        'INSERT INTO orders (user_id,status) VALUES ($1, $2) RETURNING *';
      const result = await conn.query(sqlQuery, [order.user_id, order.status]);

      //here we created order with its status but we need to add products to this order

      conn.release();
      const createdOrder = result.rows[0];
      return createdOrder;
      // const orderProductsArray = await newOrderProducts.createProductsOrder(
      //   createdOrder.id,
      //   order.products
      // );
      // console.log(`orderProductsArray is ${orderProductsArray}`);
      //we added here products to the order with the help of products_order table and its class function create
      //return { ...createdOrder, products: orderProductsArray };
    } catch (err) {
      throw new Error(`Order can't be created ${err}`);
    }
  }

  async showUserFulfilledOrders(id: number): Promise<OrderProductsType[]> {
    //this function bring all details of order and products about completed orders
    try {
      const connection = await Client.connect();
      const sqlQuery =
        'SELECT * FROM orders WHERE user_id=($2) AND status=($1)';
      const fulfilledOrders = await connection.query(sqlQuery, [
        'fulfilled',
        id,
      ]);
      //we brought here completed Orders, so we can use their id to bring all details from products_order table's class fn show

      //this condition to make sure Completed Orders not empty
      if (fulfilledOrders.rows.length) {
        //fulfilledOrders have user and orders id and status fulfilled
        //userfulfilledOrders is array of completed orders with full details of Products

        const userfulfilledOrders: OrderProductsType[] = [];
        for (const fulfilledOrder of fulfilledOrders.rows) {
          const orderProducts = await newOrderProducts.showOrderProducts(
            fulfilledOrder.id
          );
          //showOrderProducts is the function that bring all details about products in the order you pass its id
          userfulfilledOrders.push({
            ...fulfilledOrder,
            products: orderProducts,
          });
        }
        connection.release();
        return userfulfilledOrders;
      }
      return [];
    } catch (err) {
      throw new Error(`Orders Not fulfilled ${err}`);
    }
  }

  async showUserPendingOrders(id: number): Promise<OrderProductsType[]> {
    //this function bring all details of order and products about Pending orders
    try {
      const connection = await Client.connect();
      const sqlQuery =
        'SELECT * FROM orders WHERE user_id=($2) AND status=($1)';
      const pendingOrders = await connection.query(sqlQuery, ['pending', id]);
      //we brought here Pending Orders, so we can use their id to bring all details from products_order table's class fn show

      //this condition to make sure Pending Orders not empty
      if (pendingOrders.rows.length) {
        //pendingOrders have user and orders id and status pending
        //userPendingOrders is array of pending orders with full details of Products

        const userPendingOrders: OrderProductsType[] = [];
        for (const pendingOrder of pendingOrders.rows) {
          const orderProducts = await newOrderProducts.showOrderProducts(
            pendingOrder.id
          );
          //showOrderProducts is the function that bring all details about products in the order you pass its id
          userPendingOrders.push({
            ...pendingOrder,
            products: orderProducts,
          });
        }
        connection.release();
        return userPendingOrders;
      }
      return [];
    } catch (err) {
      throw new Error(`Orders Not fulfilled ${err}`);
    }
  }

  async showCurrentUserOrder(userId: number): Promise<OrderProductsType> {
    try {
      const connection = await Client.connect();
      const sqlQuery = 'SELECT * FROM orders WHERE user_id=($1)';
      const allUserOrders = await connection.query(sqlQuery, [userId]);
      connection.release();
      const currentUserOrder = allUserOrders.rows[0];
      const orderProducts = await newOrderProducts.showOrderProducts(
        currentUserOrder.id
      );
      return { ...currentUserOrder, orderProducts };
    } catch (err) {
      throw new Error(`Order can't be back ${err}`);
    }
  }
}

//In those previous functions, ideas are the same. We used order table to bring user_id and order status
//And showOrderProducts fn from its class to bring fully details about products in the order
