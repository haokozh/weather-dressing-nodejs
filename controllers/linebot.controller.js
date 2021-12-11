const linebotService = require('../services/linebot.service');

const callback = (req, res) => {
  Promise.all(req.body.events.map(linebotService.handleEvent))
    .then((result) => res.json(result))
    .catch((error) => {
      console.error(`Error on linebot.controller.callback() ${error.stack}`);
      res.status(res.statusCode).end();
    });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const authSuccess = (req, res, token) => {
  // req.session.authPass = true;
  req.session.profile = token.id_token;

  // console.log(req.session.authPass);
  console.log(req.session.profile);

  res.send(req.session.profile);
};

const authFailed = (req, res, next, error) => {
  req.session.authPass = false;
  req.session.errorMessage = error.message;

  res.send(`Error on /callback/auth ${req.session.errorMessage}`);
};

module.exports = {
  callback,
  logout,
  authSuccess,
  authFailed,
};
