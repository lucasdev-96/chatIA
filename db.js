import { Pool } from "pg";
require('dotenv').config()


export const pool = new Pool({
  user: process.env.NEXT_PUBLIC_USER,
  host: process.env.NEXT_PUBLIC_HOST,
  database: process.env.NEXT_PUBLIC_DB,
  password: process.env.NEXT_PUBLIC_PASSWORD,
  port: process.env.NEXT_PUBLIC_PORT,
});


