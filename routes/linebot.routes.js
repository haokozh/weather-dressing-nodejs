const line = require('@line/bot-sdk');
const linebotConfig = require('../config/linebot');

const express = require('express');
const router = express.Router();

const linebotController = require('../controllers/linebot.controllers');

const client = new line.Client({
  channelSecret: linebotConfig.channelSecret,
  channelAccessToken: linebotConfig.channelAccessToken,
});

// router.post('/', line.middleware(client.config), (req, res) => {
//   Promise.all(req.body.events.map(linebotController.handleEvent))
//     .then((result) => res.json(result))
//     .catch((err) => {
//       console.error(err);
//       res.status(500).end();
//     });
// });

router.post('/', linebotController.handleLineResponse);

module.exports = router;
