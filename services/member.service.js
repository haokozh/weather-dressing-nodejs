const crypto = require('crypto');
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
    const { rows } = await client.query(`SELECT * FROM member WHERE id = $1`, [
      id,
    ]);

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

    return rows[0];
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
      `INSERT INTO member(account, pwd, gender, line_id, salt) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [
        member.account,
        hashPassword(member.password, member.salt),
        member.gender,
        member.lineId,
        member.salt,
      ]
    );

    console.log('Here is newMember method');
    console.log(rows);
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};

const isAccountOrPasswordEmpty = (account, password) => {
  return account.trim() === '' || password.trim() === '';
};

const hashPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
};

const verifyPassword = (password, salt, userPassword) => {
  return hashPassword(password, salt) === userPassword;
};

const getSalt = () => {
  return crypto.randomBytes(16).toString('hex');
};

module.exports = {
  findAllMembers,
  findMemberById,
  findMemberByAccount,
  newMember,
  hashPassword,
  getSalt,
  verifyPassword,
  isAccountOrPasswordEmpty,
};
