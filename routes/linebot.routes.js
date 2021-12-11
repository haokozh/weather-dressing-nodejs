const line = require('@line/bot-sdk');
const { client } = require('../config/linebot.config');
const loginConfig = require('../config/linelogin.config');

const express = require('express');
const router = express.Router();

const linebotController = require('../controllers/linebot.controller');
const LineLogin = require('../models/line-login.model');

const lineLogin = new LineLogin(loginConfig);

router.post('/', line.middleware(client.config), linebotController.callback);

router.get('/login', lineLogin.authDirect());

router.get(
  '/auth',
  lineLogin.authcb(linebotController.authSuccess, linebotController.authFailed)
);

router.get('/logout', linebotController.logout);

module.exports = router;
