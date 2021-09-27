const client = require('../db/database');

(async () => {
  await client.connect();

  const result = await client.query(`SELECT * FROM Members WHERE Id=$1`, [1]);
  console.log(result.rows);

  client.end();
})();
