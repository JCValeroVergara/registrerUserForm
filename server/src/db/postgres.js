require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DB_STRING,

  ssl: false,
});
pool.on('error', (error) => {
    console.log('Error in PostgreSQL pool',error);
});


module.exports = pool;
