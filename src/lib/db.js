import mysql from "mysql2/promise";

let pool;

if (!pool) {
  pool = mysql.createPool({
    uri: process.env.DATABASE_URL,
    connectionLimit: 10,
  });
}

export default pool;
