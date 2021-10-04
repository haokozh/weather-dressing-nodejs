const line = require('@line/bot-sdk');

const express = require('express');
const router = express.Router();

const linebotController = require('../controllers/linebot.controllers');

router.post('/', line.middleware(linebotController.client.config),  linebotController.callback);

module.exports = router;
