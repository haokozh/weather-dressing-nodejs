const memberService = require('../services/members.services');

const getMembers = (req, res) => {
  try {
    const members = memberService.findAllMembers();

    res.render('/', { title: 'rows results', items: members });
  } catch (error) {
    console.error(error);
  }
};

const register = (req, res) => {
  res.render('members/register');
};

const newMember = (req, res) => {
  try {
    console.log('Here is req.body:');
    console.log(JSON.stringify(req.body));

    memberService.newMember(
      req.body.account,
      req.body.password,
      req.body.gender
    );

    res.status(200).send(req.body);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getMembers,
  register,
  newMember,
};
