import Database from '../database';
import { ProductType } from '../types/types';

export class Product {
  async createProduct(product: ProductType): Promise<ProductType> {
    try {
      const connection = await Database.connect();
      const sqlQuery =
        'INSERT INTO products (name,category,price) VALUES($1,$2,$3) RETURNING *';
      const result = await connection.query(sqlQuery, [
        product.name,
        product.category,
        product.price,
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`This product can't be created ${err}`);
    }
  }

  async updateProduct(id: number, product: ProductType): Promise<ProductType> {
    try {
      const connection = await Database.connect();
      const sqlQuery =
        'UPDATE products SET name = $2, category = $2, price = $3  WHERE id = $1 RETURNING *';
      const result = await connection.query(sqlQuery, [
        id,
        product.name,
        product.category,
        product.price,
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`This Product can't be updated ${err}`);
    }
  }

  async index(): Promise<ProductType[]> {
    try {
      const connection = await Database.connect();
      const sqlQuery = 'SELECT * FROM products';
      const result = await connection.query(sqlQuery);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Products Not Found ${err}`);
    }
  }

  async showProduct(id: number): Promise<ProductType> {
    try {
      const connection = await Database.connect();
      const sqlQuery = 'SELECT * FROM products WHERE id=($1)';
      const result = await connection.query(sqlQuery, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`There's no Product with this id ${err}`);
    }
  }

  async showProductsInCategory(category: string): Promise<ProductType[]> {
    try {
      const connection = await Database.connect();
      const sqlQuery = 'SELECT * FROM products WHERE category=($1)';
      const result = await connection.query(sqlQuery, [category]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`No Products in this Category ${err}`);
    }
  }

  async deleteProduct(id: number): Promise<ProductType> {
    try {
      const connection = await Database.connect();
      const sqlQuery = 'DELETE FROM products WHERE id=($1) RETURNING *';
      const result = await connection.query(sqlQuery, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`This Product can't be deleted ${err}`);
    }
  }
}
