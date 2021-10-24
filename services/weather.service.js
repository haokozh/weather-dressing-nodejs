const { get } = require('axios');
const qs = require('qs');

const pool = require('../config/db.config');
const CWBResponse = require('../models/cwb-response');

const findWeeklyIdByCityName = async (cityName) => {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(
      `SELECT weeklyId FROM cities WHERE name = $1`,
      [cityName]
    );
    console.log(rows[0].weeklyId);

    return rows[0].weeklyId;
  } catch (error) {
    console.error(`Error on findWeeklyIdByCityName(): ${error}`);
  } finally {
    client.release();
  }
};

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

const getCWBResponse = async (forecastId, distName) => {
  try {
    const elementName = ['MinT', 'MaxT', 'PoP12h', 'Wx', 'MinCI', 'MaxCI'];

    const { data } = await get(process.env.CWB_BASE_URL, {
      params: {
        Authorization: process.env.CWB_API_KEY,
        locationId: forecastId,
        locationName: distName,
        elementName: elementName,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    });

    return data;
  } catch (error) {
    console.error(`Error on linebot.service.getWeatherResponse(): ${error}`);
  }
};

const getCurrentTime = () => {
  const date = new Date(Date.now());
  return `${date.getFullYear}-${date.getMonth}-${date.getDate}`;
};

const replyFlexBubble = (
  cityName,
  distName,
  currentTime,
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
                text: `${currentTime}`,
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

const parseResponse = (records, cityName, distName) => {
  try {
    const response = new CWBResponse(records);

    return replyFlexBubble(
      cityName,
      distName,
      getCurrentTime(),
      getPoP12hDescription(response.getPoPIn12Hours()),
      response.getWeatherDescription(),
      getTempDescription(
        response.getMinTemperature(),
        response.getMaxTemperature()
      ),
      getConfortDescription(
        response.getMinConfortIndex(),
        response.getMaxConfortIndex()
      )
    );
  } catch (error) {
    console.error(`Error on parseResponse: ${error}`);
  }
};

const replyWeather = async (cityName, distName) => {
  try {
    const forecastId = findWeeklyIdByCityName(cityName);

    await getCWBResponse(forecastId, distName).then((res) => {
      return parseResponse(res, cityName, distName);
    });
  } catch (error) {
    console.error(`Error on replyWeather: ${error}`);
  }
};

module.exports = {
  replyWeather,
};
