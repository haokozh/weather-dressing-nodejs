const line = require('@line/bot-sdk');
const express = require('express');

const locationIds = require('./locationId.json');
const getWeatherResponse = require('./lib/getWeatherResponse');
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
  const splitedText = originalText.split('' || ' ');

  let locationId = '';
  let locationName = '';

  if (splitedText[0].includes('桃園')) {
    locationId = 'F-D0047-007';
    if (splitedText[1].includes('龍潭') && !splitedText[1].includes('區')) {
      locationName = splitedText[1] + '區';
    } else {
      locationName = splitedText[1];
    }
  } else if (
    splitedText[0].includes('台北') ||
    splitedText[0].includes('臺北')
  ) {
    locationId = 'F-D0047-063';
    if (splitedText[1].includes('內湖') && !splitedText[1].includes('區')) {
      locationName = splitedText[1] + '區';
    } else {
      locationName = splitedText[1];
    }
  }

  replyMessage = await getWeatherResponse(
    locationId,
    locationName,
    elementName
  );

  return client.replyMessage(event.replyToken, replyMessage);
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
