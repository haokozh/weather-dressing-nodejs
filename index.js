const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');
const { text } = require('express');

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

const replyText = (token, texts) => {
  texts = Array.isArray(texts) ? texts : [texts];

  return client.replyMessage(
    token,
    texts.map((text) => ({
      type: 'text',
      text,
    }))
  );
};

async function handleEvent(event) {
  if (isWebhookTest(event.replyToken)) return Promise.resolve(null);

  switch (event.type) {
    case 'message':
      const message = event.message;

      switch (message.type) {
        case 'text':
          return handleText(message, event.replyToken, event.source);
        case 'image':
          return handleImage(message, event.replyToken);
        case 'video':
          return handleVideo(message, event.replyToken);
        case 'audio':
          return handleAudio(message, event.replyToken);
        case 'location':
          return handleLocation(message, event.replyToken);
        case 'sticker':
          return handleSticker(message, event.replyToken);
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }

    case 'follow':
      return replyText(event.replyToken, 'Got followed event');

    case 'unfollow':
      return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

    case 'join':
      return replyText(event.replyToken, `Joined ${event.source.type}`);

    case 'leave':
      return console.log(`Left: ${JSON.stringify(event)}`);

    case 'postback':
      let data = event.postback.data;

      if (data === 'DATE' || data === 'TIME' || data === 'DATETIME') {
        data += `(${JSON.stringify(event.postback.params)})`;
      }
      return replyText(event.replyToken, `Got postback: ${data}`);

    case 'beacon':
      return replyText(event.replyToken, `Got beacon: ${event.beacon.hwid}`);

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }

  // const locationId = 'F-D0047-007';
  // const locationName = '龍潭區';
  // const elementName = 'T';
  // const startTimestamp = '2021-07-21T18:00:00';

  // const text = await getWeatherResponseFromCWB(
  //   locationId,
  //   locationName,
  //   elementName,
  //   startTimestamp
  // );

  // const replyText = {
  //   type: 'text',
  //   text: text,
  // };

  // return client.replyMessage(event.replyToken, replyText);
}

function handleText(message, replyToken, source) {
  const imageURL = 'https://https://i.imgur.com/Ex3Opfo.png';

  switch (message.text) {
    case 'carousel':
      return client.replyMessage(
        replyToken,
        {
          "type": "bubble",
          "hero": {
            "type": "image",
            "url": `${imageURL}`,
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "action": {
              "type": "uri",
              "uri": "http://linecorp.com/"
            }
          },
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "桃園市未來 36 小時天氣",
                "weight": "bold",
                "size": "xl",
                "align": "center"
              },
              {
                "type": "box",
                "layout": "vertical",
                "margin": "md",
                "contents": [
                  {
                    "type": "text",
                    "text": "07/24 18:00:00 ~ 07/25 06:00:00",
                    "size": "md",
                    "color": "#999999",
                    "margin": "md",
                    "flex": 0,
                    "align": "center",
                    "weight": "regular"
                  },
                  {
                    "type": "separator"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "vertical",
                "margin": "lg",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "spacing": "sm",
                    "contents": [
                      {
                        "type": "text",
                        "text": "天氣狀況",
                        "color": "#0099FF",
                        "weight": "bold",
                        "size": "lg",
                        "offsetEnd": "none"
                      },
                      {
                        "type": "text",
                        "text": "多雲",
                        "weight": "bold",
                        "size": "lg",
                        "offsetEnd": "xxl"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "spacing": "sm",
                    "contents": [
                      {
                        "type": "text",
                        "text": "溫度狀況",
                        "size": "lg",
                        "color": "#0099FF",
                        "weight": "bold"
                      },
                      {
                        "type": "text",
                        "text": "28°C ~ 31°C",
                        "offsetEnd": "xxl",
                        "weight": "bold",
                        "size": "lg"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "text",
                        "text": "降雨機率",
                        "color": "#0099FF",
                        "weight": "bold",
                        "size": "lg"
                      },
                      {
                        "type": "text",
                        "text": "30%",
                        "offsetEnd": "xxl",
                        "weight": "bold",
                        "size": "lg"
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "text",
                        "text": "舒適度",
                        "size": "lg",
                        "color": "#0099FF",
                        "weight": "bold"
                      },
                      {
                        "type": "text",
                        "text": "舒適至悶熱",
                        "offsetEnd": "xxl",
                        "size": "lg",
                        "weight": "bold"
                      }
                    ]
                  },
                  {
                    "type": "separator"
                  }
                ]
              }
            ]
          },
          "footer": {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "contents": [
              {
                "type": "button",
                "style": "link",
                "height": "sm",
                "action": {
                  "type": "uri",
                  "label": "詳細內容",
                  "uri": "https://www.cwb.gov.tw/V8/C/W/County/index.html"
                }
              },
              {
                "type": "spacer",
                "size": "sm"
              }
            ],
            "flex": 0
          }
        }
      );
  }
}

function handleImage(message, replyToken) {}

function handleVideo(message, replyToken) {}

function handleAudio(message, replyToken) {}

function handleLocation(message, replyToken) {}

function handleSticker(message, replyToken) {}

function isWebhookTest(replyToken) {
  return (
    replyToken === '00000000000000000000000000000000' ||
    replyToken === 'ffffffffffffffffffffffffffffffff'
  );
}

// async function getWeatherResponseFromCWB(
//   locationId,
//   locationName,
//   elementName,
//   startTimestamp
// ) {
//   const baseURL =
//     'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093';

//   const weatherResponse = await axios.get(baseURL, {
//     params: {
//       Authorization: process.env.CWB_API_KEY,
//       locationId: locationId,
//       locationName: locationName,
//       elementName: elementName,
//       startTime: startTimestamp,
//     },
//   });

//   const record = weatherResponse.data.records;
//   const locations = record.locations[0];
//   const location = locations.location[0];
//   const weatherElement = location.weatherElement[0];
//   const time = weatherElement.time[0];
//   const elementValue = time.elementValue[0];

//   const city = locations.locationsName;
//   const dist = location.locationName;
//   const description = weatherElement.description;
//   const startTime = time.startTime;
//   const endTime = time.endTime;
//   const value = elementValue.value;
//   const measures = elementValue.measures;

//   return (
//     '城市: ' +
//     city +
//     '\n' +
//     '行政區: ' +
//     dist +
//     '\n' +
//     '起始時間: ' +
//     startTime +
//     '\n' +
//     '結束時間: ' +
//     endTime +
//     '\n' +
//     description +
//     ': ' +
//     value +
//     ' \u00B0C'
//   );
// }

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
