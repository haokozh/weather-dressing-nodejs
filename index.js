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

async function handleEvent(event) {
  if (
    !isMessage(event.type) ||
    !isTextMessage(event.message.type) ||
    isWebhookTest(event.replyToken)
  ) {
    return Promise.resolve(null);
  }

  const weatherResponse = await axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093', {
      params: {
          Authorization: 'CWB-7E29EFF3-06AE-41E1-BCC8-663CE6715435',
          locationId: 'F-D0047-007',
          locationName: '龍潭區',
          elementName: 'T',
          startTime: '2021-07-07T18:00:00'
      }
  });

  const record = weatherResponse.data.records;

  const echo = {
    type: 'text',
    text: JSON.stringify(record),
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
