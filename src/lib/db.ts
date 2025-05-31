// src/lib/db.ts
import sql from 'mssql';

const config: sql.config = {
  user: process.env.AZURE_SQL_USER,
  password: process.env.AZURE_SQL_PASSWORD,
  server: process.env.AZURE_SQL_SERVER!, // debe incluir .env.local
  database: process.env.AZURE_SQL_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

const poolPromise = sql.connect(config);
export default poolPromise;
