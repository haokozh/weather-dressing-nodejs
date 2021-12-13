const line = require('@line/bot-sdk');
const { client } = require('../config/linebot.config');
const loginConfig = require('../config/linelogin.config');

const express = require('express');
const router = express.Router();

const linebotController = require('../controllers/linebot.controller');

router.post('/', line.middleware(client.config), linebotController.callback);

module.exports = router;
