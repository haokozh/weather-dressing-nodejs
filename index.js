const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');
const qs = require('qs');
const Enum = require('enum');

const lineConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const eventType = new Enum({
  MESSAGE: 'message',
  FOLLOW: 'follow',
  UNFOLLOW: 'unfollow',
  JOIN: 'join',
  LEAVE: 'leave',
  MEMBERJOINED: 'memberJoined',
  MEMBERLEFT: 'memberLeft',
  POSTBACK: 'postback',
  BEACON: 'beacon',
});

const messageType = new Enum({
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  FILE: 'file',
  LOCATION: 'location',
  STICKER: 'sticker',
});

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

  const locationId = 'F-D0047-007';
  const locationName = '龍潭區';
  const elementName = ['MinT', 'MaxT', 'PoP12h', 'Wx', 'MinCI', 'MaxCI'];

  const replyMessage = await getWeatherResponseFromCWB(
    locationId,
    locationName,
    elementName
  );

  return client.replyMessage(event.replyToken, replyMessage);
}

class ResponseData {
  constructor(records) {
    this.records = records;
  }

  getLocations() {
    return this.records.locations[0];
  }

  getLocation() {
    return this.getLocations().location[0];
  }

  getWeatherElement(elementIndex) {
    return this.getLocation().weatherElement[elementIndex];
  }

  getTime(elementIndex) {
    return this.getWeatherElement(elementIndex).time[0];
  }

  getValue(elementIndex) {
    return this.getTime(elementIndex).elementValue[0];
  }

  getMeasure(elementIndex) {
    return this.getTime(elementIndex).elementValue[1];
  }
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

  const responseData = new ResponseData(weatherResponse.data.records);

  const locations = responseData.getLocations();
  const location = responseData.getLocation();

  const pop12h = responseData.getWeatherElement(0);
  const minCI = responseData.getWeatherElement(1);
  const maxCI = responseData.getWeatherElement(3);
  const minTemp = responseData.getWeatherElement(4);
  const weatherDescription = responseData.getWeatherElement(2);
  const maxTemp = responseData.getWeatherElement(5);

  const pop12hTime = responseData.getTime(0);
  const wdTime = responseData.getTime(2);
  const minTempTime = responseData.getTime(4);
  const maxTempTime = responseData.getTime(5);
  const minCITime = responseData.getTime(1);
  const maxCITime = responseData.getTime(3);

  const pop12hValue = responseData.getValue(0);
  const wdValue = responseData.getValue(2);
  const minTempValue = responseData.getValue(4);
  const maxTempValue = responseData.getValue(5);

  // some problem
  const minCIValue = responseData.getMeasure(1);
  const maxCIValue = responseData.getMeasure(3);

  const pop12hDescription = `${pop12hValue.value}%`;
  const tempDescription = `${minTempValue.value}°C ~ ${maxTempValue.value}°C`;
  const confortDescription = `${minCIValue.value}至${maxCIValue.value}`;

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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
