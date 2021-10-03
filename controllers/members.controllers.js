const memberService = require('../services/members.services');

const newMember = (account, password, confirmPassword, gender) => {
  memberService.newMember(account, password, gender);
};

module.exports = {
  newMember,
};
