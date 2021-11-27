const pool = require('../config/db.config');

const findAllMembers = async () => {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(`SELECT * FROM member`);

    console.log('Here is findAllMembers method');
    console.log(rows);

    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};

const findMemberById = async (id) => {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(
      `SELECT * FROM member WHERE id = $1`,
      [id]
    );

    console.log('Here is findMemberById method');
    console.log(rows);

    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};

const findMemberByAccount = async (account) => {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(
      `SELECT * FROM member WHERE account = $1`,
      [account]
    );

    console.log('Here is findMemberByAccount method');
    console.log(rows);

    return rows;
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
      `INSERT INTO member(account, password, gender, line_id) VALUES($1, $2, $3, $4) RETURNING *`,
      [member.account, member.password, member.gender, member.lindId]
    );

    console.log('Here is newMember method');
    console.log(rows);
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};

// todo
const hashPassword = (password) => {
  
};

module.exports = {
  findAllMembers,
  findMemberById,
  findMemberByAccount,
  newMember,
  hashPassword,
};
