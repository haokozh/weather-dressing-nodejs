const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');

const lineConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const app = express();
const client = new line.Client(lineConfig);

app.post('/callback', line.middleware(lineConfig), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event) {
  if (
    !isMessage(event.type) ||
    !isTextMessage(event.message.type) ||
    isWebhookTest(event.replyToken)
  ) {
    return Promise.resolve(null);
  }

  const echo = {
    type: 'text',
    text: event.message.text,
  };

  return client.replyMessage(event.replyToken, echo);
}

function isMessage(eventType) {
  return eventType === 'message';
}

function isTextMessage(messageType) {
  return messageType === 'text';
}

function isWebhookTest(replyToken) {
  return (
    replyToken === '00000000000000000000000000000000' ||
    replyToken === 'ffffffffffffffffffffffffffffffff'
  );
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
