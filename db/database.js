const { Pool } = require('pg');
const dbConfig = require('../config/db');

const pool = new Pool(dbConfig);

pool.on('connect', () => {
  console.log('Database connection');
});

pool.on('end', () => {
  console.log('Connection end');
});

module.exports = pool;
