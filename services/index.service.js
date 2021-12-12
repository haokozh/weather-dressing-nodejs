const pool = require('../config/db.config');
const memberService = require('./member.service');

const findMemberByAccount = (account) => {
  return memberService.findMemberByAccount(account);
};

const insertDressListData = async (record) => {
  const client = await pool.connect();

  try {
    const { row } = await client.query(
      `INSERT INTO brand_log (member_id, age, gender, japan, korea, euro, formal, design, taiwan, sport, artist, counter) VALUES ANY ($1) RETURNING *`,
      [record]
    );

    console.log(row);
  } catch (error) {
    console.error(`Error on index.service.insertDressListData(): ${error}`);
  } finally {
    client.release();
  }
};

module.exports = {
  findMemberByAccount,
  insertDressListData,
};
