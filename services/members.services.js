const pool = require('../db/database');

async function findAllMembers() {
  try {
    await pool.connect();

    const result = await pool.query(`SELECT * FROM Members`);

    console.log(result.rows);
  } catch (error) {
    console.log(error);
  } finally {
    await pool.release();
  }
}

async function newMember(account, password, gender) {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `INSERT INTO Members(account, password, gender) VALUES($1, $2, $3) RETURNING *`,
      [account, password, gender]
    );

    console.log(result.rows);
  } catch (error) {
    console.error(error);
  } finally {
    await client.release();
  }
}

module.exports = {
  findAllMembers,
  newMember,
};
