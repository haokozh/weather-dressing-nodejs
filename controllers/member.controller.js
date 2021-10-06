const memberService = require('../services/member.service');
const Member = require('../models/member.model');

const register = (req, res) => {
  res.render('members/register');
};

const newMember = (req, res) => {
  try {
    let member = new Member(
      req.body.account,
      req.body.password,
      req.body.gender
    );

    console.log('Here is req.body:');
    console.log(JSON.stringify(member));

    memberService.newMember(member.account, member.password, member.gender);

    res.status(200).send(member);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  register,
  newMember,
};
