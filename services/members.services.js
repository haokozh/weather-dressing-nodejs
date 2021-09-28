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

async function newMember(account, password, email, lineId, cellPhone, gender) {
  try {
    await pool.connect();

    const result = await pool.query(
      `INSERT INTO Members(Account, Password, Email, LineId, CellPhone, Gender) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      [account, password, email, lineId, cellPhone, gender]
    );

    console.log(result.rows);
  } catch (error) {
    console.log(error);
  } finally {
    await pool.release();
  }
}

module.exports = {
  findAllMembers,
  newMember,
};
