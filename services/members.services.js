const client = require('../db/database');

async function findAllMembers() {
  await client.connect();

  const result = await client.query(`SELECT * FROM Members`);
  console.log(result.rows);

  client.end();
}

findAllMembers();