const pool = require('../config/db.config');
const Member = require('../models/member.model');

const findAllMembers = async () => {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(`SELECT * FROM Members`);

    console.log('Here is findAllMembers method');
    console.log(rows);

    const members = rows.map((row) => {
      return new Member(row.account, row.password, row.gender);
    });

    return members;
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};

const newMember = async (member) => {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(
      `INSERT INTO Members(account, password, gender) VALUES($1, $2, $3) RETURNING *`,
      [member.account, member.password, member.gender]
    );

    console.log('Here is newMember method');
    console.log(rows);
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};

module.exports = {
  findAllMembers,
  newMember,
};
