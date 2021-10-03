const memberService = require('../services/members.services');

function newMember(
  account,
  password,
  confirmPassword,
  // email,
  // lineId,
  // cellPhone,
  gender
) {
    memberService.newMember(account, password, gender);
}

module.exports = {
  newMember,
};
