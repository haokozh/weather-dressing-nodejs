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
  try {
    await pool.connect();

    const result = await pool.query(
      `INSERT INTO Members(Account, Password, Gender) VALUES($1, $2, $3) RETURNING *`,
      [account, password, gender]
    );

    console.log(result.rows);
  } catch (error) {
    console.error(error);
  } finally {
    try {
      await pool.release();
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = {
  findAllMembers,
  newMember,
};
