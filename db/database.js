const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'haokozh',
    password: 'Timeskip2376',
    database: 'weather_dressing'
});

module.exports = client;