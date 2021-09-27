const line = require('@line/bot-sdk');

const express = require('express');
const router = express.Router();

const linebotController = require('../controllers/linebot.controllers');

const client = linebotController.client;

router.post('/', line.middleware(client.config), (req, res) => {
  Promise.all(req.body.events.map(linebotController.handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

module.exports = router;
