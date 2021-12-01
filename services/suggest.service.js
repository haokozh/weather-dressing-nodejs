const weatherService = require('./weather.service');

const { elementParams, weatherElement } = require('../models/weather-element.model');
const ResponseData = require('../models/response-data.model');

const getResponse = async (city, dist) => {
  try {
    const forecastId = await weatherService.findWeeklyForecastIdByCityName(
      city
    );
    const { data } = await weatherService.getWeatherResponse(
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
      time: weatherService.getForecastDate(pop12hTime),
      pop: pop12h.value,
      minT: minT.value,
      maxT: maxT.value,
      minCI: minCI.value,
      maxCI: maxCI.value,
      popDesc: weatherService.getPoP12hDescription(pop12h),
      tempDesc: weatherService.getTempDescription(minT, maxT),
      confortDesc: weatherService.getConfortDescription(minCI, maxCI),
      wd: weatherDescription,
    };
  } catch (error) {
    console.error(`Error on suggestion.service.getResponse(): ${error}`);
  }
};

module.exports = {
  getResponse,
};
