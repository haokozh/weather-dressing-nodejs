const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'haokozh',
    password: 'Timeskip2376',
    database: 'weather_dressing'
});

client.on('connect', () => {
    console.log('Database connection');
});

client.on('end', () => {
    console.log('Connection end');
});

module.exports = client;