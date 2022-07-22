import { Product } from './product';
import Database from '../database';
import { ProductNumberType, ProductsOrderType } from '../types/types';

export class ProductsOrder {
  //I made this function to create order with its products having its quantity
  //we don't buy always single piece of the Product. we may buy more than one

  async createProductsOrder(
    orderId: number,
    products: ProductsOrderType[]
  ): Promise<ProductsOrderType[]> {
    try {
      const productsOrderArray: ProductsOrderType[] = [];
      const connection = await Database.connect();
      const sqlQuery =
        'INSERT INTO products_order (product_id,order_id,quantity) VALUES ($1, $2, $3) RETURNING *';

      for (const product in products) {
        const productsOrder = await connection.query(sqlQuery, [
          products[product].product_id,
          orderId,
          products[product].quantity,
        ]);
        productsOrderArray.push(productsOrder.rows[0]);
      }
      connection.release();
      return productsOrderArray;
    } catch (err) {
      throw new Error(`Failed ${err}`);
    }
  }

  async showOrderProducts(orderId: number): Promise<ProductNumberType[]> {
    try {
      const productWithoutQuantity = new Product();
      const QuantitiedProductsOfOrder: ProductNumberType[] = [];
      const connection = await Database.connect();

      // I will bring Product quantity from this table then joining it with Product
      // with id help by show function in Product table we join product with quantity
      //id of the Order should be in where to bring all products

      const sqlQuery =
        'SELECT product_id , quantity FROM products_order WHERE order_id=($1)';
      const productsOrder = await connection.query(sqlQuery, [orderId]);

      //this loop because we have many products in the same order

      for (const product of productsOrder.rows) {
        QuantitiedProductsOfOrder.push({
          ...(await productWithoutQuantity.showProduct(product.product_id)),
          quantity: product.quantity,
        });
      }
      connection.release();

      //I return array of Products with its all info including quantity in the order

      return QuantitiedProductsOfOrder;
    } catch (err) {
      throw new Error(`Process Failed ${err}`);
    }
  }
}
