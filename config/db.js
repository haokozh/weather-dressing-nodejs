module.exports = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    required: process.env.DB_SSL_MODE,
    rejectUnauthorized: process.env.REJECT_UNAUTHORIZED,
  },
};
