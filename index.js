const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');
const qs = require('qs');

const locationIds = require('./locationId.json');

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
  // return !isWebhookTest(event.replyToken)
  //   ? filterEvent(event)
  //   : Promise.resolve(null);

  // const locationId = 'F-D0047-007';
  // const locationName = '龍潭區';
  const elementName = ['MinT', 'MaxT', 'PoP12h', 'Wx', 'MinCI', 'MaxCI'];

  const originalText = event.message.text;
  const splitedText = originalText.split(' ');

  let locationId = '';
  let locationName = '';

  if (splitedText[0] === '桃園市') {
    locationId = 'F-D0047-007';
    if (splitedText[1] === '龍潭區') {
      locationName = '龍潭區';
    }
  }

  replyMessage = await getWeatherResponse(
    locationId,
    locationName,
    elementName
  );

  return client.replyMessage(event.replyToken, replyMessage);
}

// function filterEvent(event) {
//   const eventType = {
//     message: () => {
//       return filterMessage(event);
//     },
//     follow: () => {
//       return replyText(event.replyToken, 'Got followed event');
//     },
//     unfollow: () => {
//       return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);
//     },
//     join: () => {
//       return replyText(event.replyToken, `Joined ${event.source.type}`);
//     },
//     leave: () => {
//       return console.log(`Left: ${JSON.stringify(event)}`);
//     },
//     memberJoined: () => {
//       return replyText(event.replyToken, `memberJoined ${event.source.type}`);
//     },
//     memberLeft: () => {
//       return console.log(`memberLeft: ${JSON.stringify(event)}`);
//     },
//     postback: () => {
//       let data = event.postback.data;
//       if (data === 'DATE' || data == 'TIME' || data === 'DATETIME') {
//         data += `(${JSON.stringify(event.postback.params)})`;
//       }

//       return replyText(event.replyToken, `Got postback: ${data}`);
//     },
//     beacon: () => {
//       return replyText(event.replyToken, `Got beacon: ${event.beacon.hwid}`);
//     },
//     default: () => {
//       throw new Error(`Unknown message: ${JSON.stringify(message)}`);
//     },
//   };

//   return (eventType[event.type] || eventType['default'])();
// }

// function filterMessage(event) {
//   const message = event.message;

//   const messageType = {
//     text: handleText(message, event.replyToken, event.source),
//     image: handleImage(event.replyToken),
//     video: handleVideo(event.replyToken),
//     audio: handleAudio(event.replyToken),
//     file: handleFile(event.replyToken),
//     location: handleLocation(event.replyToken),
//     sticker: handleSticker(event.replyToken),
//     default: () => {
//       throw new Error(`Unknown message: ${JSON.stringify(message)}`);
//     },
//   };

//   return (messageType[message.type] || messageType['default'])();
// }

// function filterMessageText(message, replyToken, source) {
//   const messageText = {
//     profile: replyProfile(replyToken, source),
//     buttons: replyButtonTemplate(replyToken),
//     confirm: replyConfirmTemplate(replyToken),
//     carousel: replyCarouselTemplate(replyToken),
//     'image carousel': replyImageCarouselTemplate(replyToken),
//     datetime: replyDateTime(replyToken),
//     imagemap: replyImagemap(replyToken),
//     bye: replyBye(replyToken, source),
//     default: () => {
//       console.log(`Echo message to ${replyToken}: ${message.text}`);
//       return replyText(replyToken, message.text);
//     },
//   };

//   return (messageText[message.text] || messageText['default'])();
// }

// function replyProfile(replyToken, source) {
//   return source.userId
//     ? client
//         .getProfile(source.userId)
//         .then((profile) =>
//           replyText(replyToken, [
//             `Display name: ${profile.displayName}`,
//             `Status message: ${profile.statusMessage}`,
//           ])
//         )
//     : replyText(replyToken, "Bot can't use profile API without user ID.");
// }

// function replyButtonTemplate(replyToken) {
//   return client.replyMessage(replyToken, {
//     type: 'template',
//     altText: 'Buttons alt text',
//     template: {
//       type: 'buttons',
//       thumbnailImageUrl: 'https://i.imgur.com/Ex3Opfo.png',
//       title: 'Hello, my button',
//       actions: [
//         { label: 'Go to line.me', type: 'uri', uri: 'https://line.me' },
//         { label: 'Say hello1', type: 'postback', data: 'hello こんにちは' },
//         {
//           label: '言 hello2',
//           type: 'postback',
//           data: 'hello こんにちは',
//           text: 'hello こんにちは',
//         },
//         { label: 'Say message', type: 'message', text: 'Rice=米' },
//       ],
//     },
//   });
// }

// function replyConfirmTemplate(replyToken) {
//   return client.replyMessage(replyToken, {
//     type: 'template',
//     altText: 'Confirm alt text',
//     template: {
//       type: 'confirm',
//       text: 'Do it?',
//       actions: [
//         { label: 'Yes', type: 'message', text: 'Yes!' },
//         { label: 'No', type: 'message', text: 'No!' },
//       ],
//     },
//   });
// }

// function replyCarouselTemplate(replyToken) {
//   return client.replyMessage(replyToken, {
//     type: 'template',
//     altText: 'Carousel alt text',
//     template: {
//       type: 'carousel',
//       columns: [
//         {
//           thumbnailImageUrl: 'https://i.imgur.com/Ex3Opfo.png',
//           title: 'hoge',
//           text: 'fuga',
//           actions: [
//             { label: 'Go to line.me', type: 'uri', uri: 'https://line.me' },
//             { label: 'Say hello1', type: 'postback', data: 'hello こんにちは' },
//           ],
//         },
//         {
//           thumbnailImageUrl: 'https://i.imgur.com/Ex3Opfo.png',
//           title: 'hoge',
//           text: 'fuga',
//           actions: [
//             {
//               label: '言 hello2',
//               type: 'postback',
//               data: 'hello こんにちは',
//               text: 'hello こんにちは',
//             },
//             { label: 'Say message', type: 'message', text: 'Rice=米' },
//           ],
//         },
//       ],
//     },
//   });
// }

// function replyImageCarouselTemplate(replyToken) {
//   return client.replyMessage(replyToken, {
//     type: 'template',
//     altText: 'Image carousel alt text',
//     template: {
//       tyep: 'image_carousel',
//       columns: [
//         {
//           imageUrl: 'https://i.imgur.com/Ex3Opfo.png',
//           action: { label: 'Go to LINE', type: 'uri', uri: 'https://line.me' },
//         },
//         {
//           imageUrl: 'https://i.imgur.com/Ex3Opfo.png',
//           action: {
//             label: 'Say hello1',
//             type: 'postback',
//             data: 'hello こんにちは',
//           },
//         },
//         {
//           imageUrl: 'https://i.imgur.com/Ex3Opfo.png',
//           action: { label: 'Say message', type: 'message', text: 'Rice=米' },
//         },
//         {
//           imageUrl: 'https://i.imgur.com/Ex3Opfo.png',
//           action: {
//             label: 'datetime',
//             type: 'datetimepicker',
//             data: 'DATETIME',
//             mode: 'datetime',
//           },
//         },
//       ],
//     },
//   });
// }

// function replyDateTime(replyToken) {
//   return client.replyMessage(replyToken, {
//     type: 'template',
//     altText: 'Datetime pickers alt text',
//     template: {
//       type: 'buttons',
//       text: 'Select date / time !',
//       actions: [
//         { type: 'datetimepicker', label: 'date', data: 'DATE', mode: 'date' },
//         { type: 'datetimepicker', label: 'time', data: 'TIME', mode: 'time' },
//         {
//           type: 'datetimepicker',
//           label: 'datetime',
//           data: 'DATETIME',
//           mode: 'datetime',
//         },
//       ],
//     },
//   });
// }

// function replyImagemap(replyToken) {
//   return client.replyMessage(replyToken, {
//     type: 'imagemap',
//     baseUrl: `${baseURL}/static/rich`,
//     altText: 'Imagemap alt text',
//     baseSize: { width: 1040, height: 1040 },
//     actions: [
//       {
//         area: { x: 0, y: 0, width: 520, height: 520 },
//         type: 'uri',
//         linkUri: 'https://store.line.me/family/manga/en',
//       },
//       {
//         area: { x: 520, y: 0, width: 520, height: 520 },
//         type: 'uri',
//         linkUri: 'https://store.line.me/family/music/en',
//       },
//       {
//         area: { x: 0, y: 520, width: 520, height: 520 },
//         type: 'uri',
//         linkUri: 'https://store.line.me/family/play/en',
//       },
//       {
//         area: { x: 520, y: 520, width: 520, height: 520 },
//         type: 'message',
//         text: 'URANAI!',
//       },
//     ],
//     video: {
//       originalContentUrl: `${baseURL}/static/imagemap/video.mp4`,
//       previewImageUrl: `${baseURL}/static/imagemap/preview.jpg`,
//       area: {
//         x: 280,
//         y: 385,
//         width: 480,
//         height: 270,
//       },
//       externalLink: {
//         linkUri: 'https://line.me',
//         label: 'LINE',
//       },
//     },
//   });
// }

// function replyBye(replyToken, source) {
//   switch (source.type) {
//     case 'user':
//       return replyText(replyToken, "Bot can't leave from 1:1 chat");
//     case 'group':
//       return replyText(replyToken, 'Leaving group').then(() =>
//         client.leaveGroup(source.groupId)
//       );
//     case 'room':
//       return replyText(replyToken, 'Leaving room').then(() =>
//         client.leaveRoom(source.roomId)
//       );
//   }
// }

// function handleText(message, replyToken, source) {
//   return filterMessageText(message, replyToken, source);
// }
// function handleImage(replyToken) {
//   return replyText(replyToken, 'you send a image.');
// }
// function handleVideo(replyToken) {
//   return replyText(replyToken, 'you send a video.');
// }
// function handleAudio(replyToken) {
//   return replyText(replyToken, 'you send a audio.');
// }
// function handleFile(replyToken) {
//   return replyText(replyToken, 'you send a file.');
// }
// function handleLocation(replyToken) {
//   return replyText(replyToken, 'you send a location.');
// }
// function handleSticker(replyToken) {
//   return replyText(replyToken, 'you send a sticker.');
// }

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

  const responseData = new ResponseData(weatherResponse.data.records);

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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
