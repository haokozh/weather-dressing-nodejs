const { get } = require('axios');
const qs = require('qs');

const ResponseData = require('../models/response-data.model');
const weatherElement = require('../models/weather-element.model').weatherElement;
const pool = require('../config/db.config');

const getWeatherResponse = async (locationId, locationName, elementName) => {
  try {
    const { data } = await get(process.env.CWB_BASE_URL, {
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

    return data;
  } catch (error) {
    console.error(
      `Error on linebot.service.getWeatherResponse(): ${error.stack}`
    );
  }
};

const getForecastDate = (time) => {
  return time.substring(0, 9);
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

const parseResponseToFlexBubble = (data) => {
  try {
    const responseData = new ResponseData(data.records);
    const locationIndex = 0;
    const timeIndex = 0;
    const elementValueIndex = 0;
    const confortValueIndex = 1;

    const pop12hTime = responseData.getTime(
      locationIndex,
      weatherElement.POP_12H,
      timeIndex
    );
    const pop12h = responseData.getElementValue(
      locationIndex,
      weatherElement.POP_12H,
      timeIndex,
      elementValueIndex
    );

    const weatherDescription = responseData.getElementValue(
      locationIndex,
      weatherElement.WEATHER_DESCRIPTION,
      timeIndex,
      elementValueIndex
    );

    const minT = responseData.getElementValue(
      locationIndex,
      weatherElement.MIN_T,
      timeIndex,
      elementValueIndex
    );
    const maxT = responseData.getElementValue(
      locationIndex,
      weatherElement.MAX_T,
      timeIndex,
      elementValueIndex
    );

    const minCI = responseData.getElementValue(
      locationIndex,
      weatherElement.MIN_CI,
      timeIndex,
      confortValueIndex
    );
    const maxCI = responseData.getElementValue(
      locationIndex,
      weatherElement.MAX_CI,
      timeIndex,
      confortValueIndex
    );

    return replyFlexBubble(
      responseData.locationsName,
      responseData.locationName,
      pop12hTime,
      getPoP12hDescription(pop12h.value),
      weatherDescription,
      getTempDescription(minT.value, maxT.value),
      getConfortDescription(minCI.value, maxCI.value)
    );
  } catch (error) {
    console.error(
      `Error on linebot.service.parseResponseToFlexBubble(): ${error.stack}`
    );
  }
};

const replyFlexBubble = (
  locationsName,
  locationName,
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
            text: `${locationsName} ${locationName}`,
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
                text: `${getForecastDate(pop12hTime.startTime)} ~ ${getForecastDate(pop12hTime.endTime)}`,
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

// 將 '台' 轉成 '臺'
const replaceCityName = (cityName) => {
  return cityName.includes('台') ? cityName.replace('台', '臺') : cityName;
};

const findWeeklyForecastIdByCityName = async (cityName) => {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(
      `SELECT * FROM cities WHERE name = $1`,
      [replaceCityName(cityName)]
    );

    return rows[0].weeklyid;
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};

const findWeeklyForecastIdByDistName = async (distName) => {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(
      `SELECT cities.name AS cityname, dists.name AS distname, cities.weeklyid FROM cities JOIN dists ON cities.id = dists.cityid AND dists.name LIKE $1`,
      [`%${distName}%`]
    );

    console.log(rows);

    return rows;
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};

module.exports = {
  getWeatherResponse,
  parseResponseToFlexBubble,
  findWeeklyForecastIdByCityName,
  findWeeklyForecastIdByDistName,
};
