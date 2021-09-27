const client = require('../db/database');

// async function findAllMembers() {
//   await client.connect();

//   const result = await client.query(`INSERT INTO Members VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, ['haokozh', '123', 'haokozh@gmail.com', 'ghaibhleann', 'M']);
//   console.log(result.rows);

//   client.end();
// }

// module.exports = {
//   findAllMembers,
// };

(async () => {
  try {
    await client.connect();
    const result = await client.query(
      `INSERT INTO Members(Account, Password, Email, LineId, CellPhone, Gender) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      ['haokozh', '123', 'haokozh@gmail.com', 'ghaibhleann', '0912345678', 'M']
    );

    client.end();
  } catch (error) {
    console.log(error);
  }
})();
