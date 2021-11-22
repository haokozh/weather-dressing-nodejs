const { get } = require('axios');
const qs = require('qs');
const { weatherElement } = require('../models/weather-element.model');
const ResponseData = require('../models/response-data.model');
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
      pop12h.value,
      weatherDescription,
      minT.value,
      maxT.value,
      minCI.value,
      maxCI.value
    );
  } catch (error) {
    console.error(
      `Error on weather.service.parseResponseToFlexBubble(): ${error.stack}`
    );
  }
};

const getLocationText = (locationsName, locationName) => {
  return {
    type: 'text',
    text: `${locationsName} ${locationName}`,
    weight: 'bold',
    size: 'xl',
    align: 'center',
  };
};

const getHeroBlock = () => {
  return {
    type: 'image',
    url: 'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip4.jpg',
    size: 'full',
    aspectRatio: '16:9',
    aspectMode: 'cover',
    action: {
      type: 'uri',
      uri: 'http://linecorp.com/',
    },
  };
};

const getBody = (
  locationsName,
  locationName,
  pop12hTime,
  pop12hDescription,
  weatherDescription,
  tempDescription,
  confortDescription
) => {
  return {
    type: 'box',
    layout: 'vertical',
    contents: [
      getLocationText(locationsName, locationName),
      {
        type: 'box',
        layout: 'vertical',
        margin: 'md',
        contents: [
          {
            type: 'text',
            text: `${getForecastDate(pop12hTime.startTime)} ~ ${getForecastDate(
              pop12hTime.endTime
            )}`,
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
  };
};

const getFooter = (city, dist) => {
  return {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'button',
        action: {
          type: 'postback',
          label: '查看天氣穿搭',
          data: '查看天氣穿搭',
          params: {
            city: city,
            dist: dist,
          }
        },
      },
    ],
  };
};

const replyFlexBubble = (
  cityName,
  distName,
  pop12hTime,
  pop12h,
  weatherDescription,
  minT,
  maxT,
  minCI,
  maxCI
) => {
  return (replyBubble = {
    type: 'flex',
    altText: 'Weather infomation flex message',
    contents: {
      type: 'bubble',
      hero: getHeroBlock(),
      body: getBody(
        cityName,
        distName,
        pop12hTime,
        getPoP12hDescription(pop12h),
        weatherDescription,
        getTempDescription(minT, maxT),
        getConfortDescription(minCI, maxCI)
      ),
      footer: getFooter(cityName, distName),
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
      `SELECT * FROM city WHERE city_name = $1`,
      [replaceCityName(cityName)]
    );

    return rows[0].forecast_id;
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
      `SELECT city.city_name AS cityname, dist.dist_name AS distname, city.forecast_id AS forecastid FROM city JOIN dist ON city.id = dist.city_id AND dist.dist_name LIKE $1`,
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
