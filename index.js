const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');
const qs = require('qs');

const locationIds = require('./locationId.json');
const weather = require('./ResponseData');

const lineConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const replyText = (token, texts) => {
  texts = Array.isArray(texts) ? texts : [texts];
  return client.replyMessage(
    token,
    texts.map((text) => ({ type: 'text', text }))
  );
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
  if (isWebhookTest(event.replyToken)) return Promise.resolve(null);

  // const locationId = 'F-D0047-007';
  // const locationName = '龍潭區';
  const elementName = ['MinT', 'MaxT', 'PoP12h', 'Wx', 'MinCI', 'MaxCI'];

  const originalText = event.message.text;
  const splitedText = originalText.split(' ');

  let locationId = '';
  let locationName = '';

  if (splitedText[0].includes('桃園')) {
    locationId = 'F-D0047-007';
    if (splitedText[1].includes('龍潭')) {
      locationName = splitedText[1] + '區';
    }
  }

  replyMessage = await getWeatherResponse(
    locationId,
    locationName,
    elementName
  );

  return client.replyMessage(event.replyToken, replyMessage);
}

async function getWeatherResponse(
  locationId,
  locationName,
  elementName
) {
  const baseURL =
    'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093';

  const weatherResponse = await axios.get(baseURL, {
    params: {
      Authorization: process.env.CWB_API_KEY,
      locationId: locationId,
      locationName: locationName,
      elementName: elementName,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });

  const responseData = new weather.ResponseData(weatherResponse.data.records);

  const locations = responseData.getLocations();

  const pop12hTime = responseData.getTime(weatherElement.POP_12H);
  const pop12hValue = responseData.getValue(weatherElement.POP_12H);
  const pop12hDescription = `${pop12hValue.value}%`;

  const wdValue = responseData.getValue(weatherElement.WEATHER_DESCRIPTION);

  const minTempValue = responseData.getValue(weatherElement.MIN_T);
  const maxTempValue = responseData.getValue(weatherElement.MAX_T);
  const tempDescription = `${minTempValue.value}°C ~ ${maxTempValue.value}°C`;

  // some problem
  const minCIValue = responseData.getMeasure(weatherElement.MIN_CI);
  const maxCIValue = responseData.getMeasure(weatherElement.MAX_CI);

  // if minCI === maxCI
  const confortDescription = `${minCIValue.value}至${maxCIValue.value}`;

  return replyFlexBubble(locations, pop12hTime, pop12hDescription, wdValue, tempDescription, confortDescription)
}

function replyFlexBubble(locations, pop12hTime, pop12hDescription, wdValue, tempDescription, confortDescription) {
  return (replyBubble = {
    type: 'flex',
    altText: 'This is FlexMessage',
    contents: {
      type: 'bubble',
      hero: {
        type: 'image',
        url: 'https://i.imgur.com/Ex3Opfo.png',
        size: 'full',
        aspectRatio: '20:13',
        aspectMode: 'cover',
        action: {
          type: 'uri',
          uri: 'http://linecorp.com/',
        },
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: locations.datasetDescription,
            weight: 'bold',
            size: 'xl',
            align: 'center',
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'md',
            contents: [
              {
                type: 'text',
                text: `${pop12hTime.startTime} ~ ${pop12hTime.endTime}`,
                size: 'md',
                color: '#999999',
                margin: 'md',
                flex: 0,
                align: 'center',
                weight: 'regular',
              },
              {
                type: 'separator',
              },
            ],
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            spacing: 'sm',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                spacing: 'sm',
                contents: [
                  {
                    type: 'text',
                    text: '天氣狀況',
                    color: '#0099FF',
                    weight: 'bold',
                    size: 'lg',
                    offsetEnd: 'none',
                  },
                  {
                    type: 'text',
                    text: wdValue.value,
                    weight: 'bold',
                    size: 'lg',
                    offsetEnd: 'xxl',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                spacing: 'sm',
                contents: [
                  {
                    type: 'text',
                    text: '溫度狀況',
                    size: 'lg',
                    color: '#0099FF',
                    weight: 'bold',
                  },
                  {
                    type: 'text',
                    text: tempDescription,
                    offsetEnd: 'xxl',
                    weight: 'bold',
                    size: 'lg',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '降雨機率',
                    color: '#0099FF',
                    weight: 'bold',
                    size: 'lg',
                  },
                  {
                    type: 'text',
                    text: pop12hDescription,
                    offsetEnd: 'xxl',
                    weight: 'bold',
                    size: 'lg',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '舒適度',
                    size: 'lg',
                    color: '#0099FF',
                    weight: 'bold',
                  },
                  {
                    type: 'text',
                    text: confortDescription,
                    offsetEnd: 'xxl',
                    size: 'lg',
                    weight: 'bold',
                  },
                ],
              },
              {
                type: 'separator',
              },
            ],
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'button',
            style: 'link',
            height: 'sm',
            action: {
              type: 'uri',
              label: '詳細內容',
              uri: 'https://www.cwb.gov.tw/V8/C/W/County/index.html',
            },
          },
          {
            type: 'spacer',
            size: 'sm',
          },
        ],
        flex: 0,
      },
    },
  });
}

function isWebhookTest(replyToken) {
  return (
    replyToken === '00000000000000000000000000000000' ||
    replyToken === 'ffffffffffffffffffffffffffffffff'
  );
}

const weatherElement = {
  POP_12H: 0,
  MIN_CI: 1,
  WEATHER_DESCRIPTION: 2,
  MAX_CI: 3,
  MIN_T: 4,
  MAX_T: 5,
};

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
