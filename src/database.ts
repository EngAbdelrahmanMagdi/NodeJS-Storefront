import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const { HOST, DEV_DB, USER, PASSWORD, TEST_DB, ENV } = process.env;

const Database =
  ENV === 'dev'
    ? new Pool({
        host: HOST,
        database: DEV_DB,
        user: USER,
        password: PASSWORD,
      })
    : new Pool({
        host: HOST,
        database: TEST_DB,
        user: USER,
        password: PASSWORD,
      });
export default Database;
