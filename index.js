const line = require('@line/bot-sdk');
const express = require('express');

const getWeatherResponse = require('./lib/getWeatherResponse');
const get48HoursLocationId = require('./lib/get48HoursLocationId');
const getWeeklyLocationId = require('./lib/getWeeklyLocationId');
const getTargetDistByLocationsName = require('./lib/getTargetDistByLocationsName');

const isWebhookTest = require('./lib/isWebhookTest');
const config = require('./config');

const replyText = (token, texts) => {
  texts = Array.isArray(texts) ? texts : [texts];
  return client.replyMessage(
    token,
    texts.map((text) => ({ type: 'text', text }))
  );
};

const app = express();
const client = new line.Client({
  channelSecret: config.channelSecret,
  channelAccessToken: config.channelAccessToken,
});

app.post('/callback', line.middleware(client.config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

async function handleEvent(event) {
  if (isWebhookTest(event.replyToken)) return Promise.resolve(null);

  // const locationId = 'F-D0047-007';
  // const locationName = '龍潭區';
  const elementName = ['MinT', 'MaxT', 'PoP12h', 'Wx', 'MinCI', 'MaxCI'];

  const originalText = event.message.text;
  const splitedText = originalText.split(' ');

  let locationId = getWeeklyLocationId(splitedText[0]);
  let locationName = getTargetDistByLocationsName(splitedText[1], splitedText[0]);

  replyMessage = await getWeatherResponse(
    locationId,
    locationName,
    elementName
  );

  return client.replyMessage(event.replyToken, replyMessage);
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
