import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const { HOST, DEV_DB, USER, PASSWORD } = process.env;

const Database = new Pool({
  host: HOST,
  database: DEV_DB,
  user: USER,
  password: PASSWORD,
});

export default Database;
