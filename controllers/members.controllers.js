const memberService = require('../services/members.services');

function newMember(
  account,
  password,
  confirmPassword,
  gender
) {
    memberService.newMember(account, password, gender);
}

module.exports = {
  newMember,
};
