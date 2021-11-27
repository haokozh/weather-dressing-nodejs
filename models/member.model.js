class Member {
  constructor(account, password, gender, lineId, salt) {
    this.account = account;
    this.password = password;
    this.gender = gender;
    this.lineId = lineId;
    this.salt = salt;
  }
}

module.exports = Member;
