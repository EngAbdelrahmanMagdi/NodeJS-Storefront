import Database from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { UserType, UserUpdatedType } from '../types/types';

dotenv.config();
const { PASSWORD_PEPPER, SALT } = process.env;

export class User {
  async createUser(user: UserType): Promise<UserType> {
    try {
      const connection = await Database.connect();

      const sqlQuery =
        'INSERT INTO users (user_name,password,first_name,last_name) VALUES($1,$2,$3,$4) RETURNING *';
      const passwordHashed = bcrypt.hashSync(
        user.password + PASSWORD_PEPPER,
        parseInt(SALT as string)
      );
      const result = await connection.query(sqlQuery, [
        user.userName,
        passwordHashed,
        user.firstName,
        user.lastName,
      ]);

      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`User cannot be created ${err}`);
    }
  }

  async updateUser(id: number, user: UserUpdatedType): Promise<UserType> {
    try {
      const connection = await Database.connect();
      const sqlQuery =
        'UPDATE users SET user_name = $2, first_name = $3, last_name = $4 WHERE id = $1 RETURNING *';
      const result = await connection.query(sqlQuery, [
        id,
        user.userName,
        user.firstName,
        user.lastName,
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't update this user => ${err}`);
    }
  }
  async index(): Promise<UserType[]> {
    try {
      const connection = await Database.connect();
      const sqlQuery = 'SELECT id, user_name, first_name,last_name FROM users';
      const result = await connection.query(sqlQuery);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`We can't get users ${err}`);
    }
  }

  async showUser(id: number): Promise<UserType> {
    try {
      const connection = await Database.connect();
      const sqlQuery =
        'SELECT id, user_name, first_name, last_name FROM users WHERE id =($1)';
      const result = await connection.query(sqlQuery, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't get the user with ${id} id ${err}`);
    }
  }

  async login(username: string, password: string): Promise<UserType | null> {
    try {
      const connection = await Database.connect();
      const sqlQuery = 'SELECT * FROM users WHERE user_name=($1)';
      const result = await connection.query(sqlQuery, [username]);
      if (result.rows.length) {
        const user: UserType = result.rows[0];
        if (bcrypt.compareSync(password + PASSWORD_PEPPER, user.password)) {
          return user;
        }
      }
      connection.release();
      return null;
    } catch (err) {
      throw new Error(`Login Failed for this user ${username} => ${err}`);
    }
  }
}
