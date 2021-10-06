const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

pool.on('connect', () => {
  console.log('Connection start');
});

pool.on('end', () => {
  console.log('Connection end');
});

module.exports = pool;