const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const LineStrategy = require('passport-line-auth').Strategy;

const memberService = require('../services/member.service');

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

const lineStrategy = new LineStrategy(
  {
    channelID: '1656649772',
    channelSecret: 'd547d76ee368206d67fd9cc04af168e8',
    callbackURL: 'https://weather-dressing.herokuapp.com/login/line/return',
    scope: ['profile', 'openid'],
    botPrompt: 'normal',
    uiLocales: 'zh_TW',
  },
  (accessToken, refreshToken, params, profile, done) => {
    return done(null, profile);
  }
);

const localStrategy = new LocalStrategy(
  {
    usernameField: 'account',
    passwordField: 'password',
  },
  (account, password, salt, done) => {
    try {
      const user = memberService.findMemberByAccount(account);

      if (user == null) {
        return done(null, false, { message: '此帳號不存在' });
      }

      if (memberService.verifyPassword(password, salt, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: '密碼不正確' });
      }
    } catch (error) {
      return done(error);
    }
  }
);

passport.use('line', lineStrategy);
passport.use('local', localStrategy);

module.exports = passport;
