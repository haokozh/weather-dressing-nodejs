const memberService = require('../services/member.service');
const Member = require('../models/member.model');

const findAllMembers = async (req, res) => {
  try {
    const members = await memberService.findAllMembers();
    res.status(200).send(members);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const register = (req, res) => {
  res.render('members/register');
};

const newMember = (req, res) => {
  try {
    const member = new Member(
      req.body.account,
      req.body.password,
      req.body.gender
    );

    console.log('Here is req.body:');
    console.log(JSON.stringify(member));

    memberService.newMember(member);

    res.status(200).send(member);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  findAllMembers,
  register,
  newMember,
};
