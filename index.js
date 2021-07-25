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

  const locationId = 'F-D0047-007';
  const locationName = '龍潭區';
  const elementName = 'T';
  const startTimestamp = '2021-07-21T18:00:00';

  const text = await getWeatherResponseFromCWB(
    locationId,
    locationName,
    elementName,
    startTimestamp
  );

  const replyText = {
    type: 'text',
    text: text,
  };

  return client.replyMessage(event.replyToken, replyText);
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

async function getWeatherResponseFromCWB(
  locationId,
  locationName,
  elementName,
  startTimestamp
) {
  const baseURL =
    'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093';

  const weatherResponse = await axios.get(baseURL, {
    params: {
      Authorization: process.env.CWB_API_KEY,
      locationId: locationId,
      locationName: locationName,
      elementName: elementName,
      startTime: startTimestamp,
    },
  });

  const record = weatherResponse.data.records;
  const locations = record.locations[0];
  const location = locations.location[0];
  const weatherElement = location.weatherElement[0];
  const time = weatherElement.time[0];
  const elementValue = time.elementValue[0];

  const city = locations.locationsName;
  const dist = location.locationName;
  const description = weatherElement.description;
  const startTime = time.startTime;
  const endTime = time.endTime;
  const value = elementValue.value;
  const measures = elementValue.measures;

  return (
    '城市: ' +
    city +
    '\n' +
    '行政區: ' +
    dist +
    '\n' +
    '起始時間: ' +
    startTime +
    '\n' +
    '結束時間: ' +
    endTime +
    '\n' +
    description +
    ': ' +
    value +
    ' \u00B0C'
  );
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
