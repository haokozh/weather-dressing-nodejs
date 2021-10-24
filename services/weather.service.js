const { get } = require('axios');
const qs = require('qs');

const pool = require('../config/db.config');

const getPoP12hDescription = (value) => {
  return `${value}%`;
};

const getTempDescription = (minTValue, maxTValue) => {
  return `${minTValue}°C ~ ${maxTValue}°C`;
};

const getConfortDescription = (minCIValue, maxCIValue) => {
  return minCIValue === maxCIValue
    ? `${minCIValue}`
    : `${minCIValue}至${maxCIValue}`;
};

const replyFlexBubble = (
  cityName,
  distName,
  pop12hTime,
  pop12hDescription,
  weatherDescription,
  tempDescription,
  confortDescription
) => {
  return (replyBubble = {
    type: 'flex',
    altText: 'This is FlexMessage',
    contents: {
      type: 'bubble',
      hero: {
        type: 'image',
        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip4.jpg',
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
            text: `${cityName} ${distName}`,
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
                contents: [
                  {
                    type: 'text',
                    text: '天氣狀況',
                    color: '#0099FF',
                    weight: 'bold',
                    size: 'md',
                    offsetEnd: 'none',
                  },
                  {
                    type: 'text',
                    text: weatherDescription.value,
                    weight: 'bold',
                    size: 'md',
                    offsetEnd: '50px',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '溫度狀況',
                    size: 'md',
                    color: '#0099FF',
                    weight: 'bold',
                  },
                  {
                    type: 'text',
                    text: tempDescription,
                    offsetEnd: '50px',
                    weight: 'bold',
                    size: 'md',
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
                    size: 'md',
                  },
                  {
                    type: 'text',
                    text: pop12hDescription,
                    offsetEnd: '50px',
                    weight: 'bold',
                    size: 'md',
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
                    size: 'md',
                    color: '#0099FF',
                    weight: 'bold',
                  },
                  {
                    type: 'text',
                    text: confortDescription,
                    offsetEnd: '50px',
                    size: 'md',
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
};

module.exports = {

};
