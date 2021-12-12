const pool = require('../config/db.config');
const weatherService = require('./weather.service');
const memberService = require('./member.service');

const {
  elementParams,
  weatherElement,
} = require('../models/weather-element.model');
const ResponseData = require('../models/response-data.model');

const getResponse = async (city, dist) => {
  try {
    const forecastId = await weatherService.findWeeklyForecastIdByCityName(
      city
    );

    const data = await weatherService.getWeatherResponse(
      forecastId,
      dist,
      elementParams
    );

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

    return {
      cityName: responseData.locationsName,
      distName: responseData.locationName,
      time: `${weatherService.getForecastDate(
        pop12hTime.startTime
      )} ~ ${weatherService.getForecastDate(pop12hTime.endTime)}`,
      pop: pop12h.value,
      minT: minT.value,
      maxT: maxT.value,
      minCI: minCI.value,
      maxCI: maxCI.value,
      popDesc: weatherService.getPoP12hDescription(pop12h.value),
      tempDesc: weatherService.getTempDescription(minT.value, maxT.value),
      confortDesc: weatherService.getConfortDescription(
        minCI.value,
        maxCI.value
      ),
      wd: weatherDescription.value,
    };
  } catch (error) {
    console.error(`Error on suggestion.service.getResponse(): ${error}`);
  }
};

const saveFavorite = async (
  account,
  favoriteName,
  cityName,
  distName,
  purposeName
) => {
  const client = await pool.connect();

  try {
    const member = await memberService.findMemberByAccount(account);
    const purpose = await findPurposeByName(purposeName);
    const city = await weatherService.findCityByCityName(cityName);
    const dist = await weatherService.findDistByCityIdAndDistName(
      city.id,
      distName
    );

    const { row } = await client.query(
      `INSERT INTO favorite (member_id, favorite_name, purpose_id, dist_id) VALUES ($1, $2, $3, $5) RETURNING *`,
      [member.id, favoriteName, purpose.id, dist.id]
    );

    console.log(row);
  } catch (error) {
    console.error(`Error on suggest.service.saveFavorite(): ${error}`);
  }
};

const findPurposeByName = async (purposeName) => {
  const client = await pool.connect();

  try {
    const { row } = await client.query(
      `SELECT * FROM purpose WHERE purpose_name = $1`,
      [purposeName]
    );

    console.log(row);
    return row;
  } catch (error) {
    console.error(`Error on findPurposeByName(): ${error}`);
  }
};

module.exports = {
  getResponse,
  saveFavorite,
};
