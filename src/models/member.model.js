class Member {
    constructor(member) {
        this.account = member.account;
        this.password = member.password;
        this.gender = member.gender;
    }

    get account() {
        return this.account;
    }

    set account(account) {
        this.account = account;
    }

    get password() {
        return this.password;
    }

    set password(password) {
        this.password = password;
    }

    get gender() {
        return this.gender;
    }

    set gender() {
        this.gender = gender;
    }
}

module.exports = Member;