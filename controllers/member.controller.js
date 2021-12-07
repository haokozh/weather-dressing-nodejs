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

const findMemberById = async (req, res) => {
  try {
    const member = await memberService.findMemberById(req.params.id);
    res.status(200).send(member);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const register = (req, res) => {
  res.render('members/register', { title: '註冊' });
};

const newMember = (req, res) => {
  try {
    const member = new Member(
      req.body.account,
      req.body.pwd,
      req.body.gender,
      req.body.lineId,
      memberService.getSalt()
    );

    console.log('Here is req.body:');
    console.log(JSON.stringify(member));

    memberService.newMember(member);

    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
};

const renderLogin = (req, res) => {
  res.render('members/login', { title: '登入' });
};

const login = async (req, res) => {
  try {
    const { account, password } = req.body;

    if (memberService.isAccountOrPasswordEmpty(account, password)) {
      res.render('members/login', { title: '登入', alert: '帳號或密碼錯誤' });
    }
    const member = await memberService.findMemberByAccount(account);

    if (
      member != null &&
      memberService.verifyPassword(password, member.salt, member.pwd)
    ) {
      req.session.user = member.account;
      console.log(req.session);
      console.log(req.sessionID);
      console.log(`${req.session.user} is logged in`);

      res.redirect('/');
    }
  } catch (error) {
    console.error(`Error on login(): ${error}`);
  }
};

const logout = (req, res) => {
  req.session.destory(() => {
    console.log('session destory');
  });

  res.render('index', { alert: '您已登出' });
};

module.exports = {
  findAllMembers,
  findMemberById,
  register,
  newMember,
  renderLogin,
  login,
  logout,
};
