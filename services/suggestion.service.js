const weatherService = require('./weather.service');

const { elementParams } = require('../models/weather-element.model');
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

    return data;
  } catch (error) {
    console.error(`Error on suggestion.service.getResponse(): ${error}`);
  }
};

const parseResponseData = (data) => {
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

  const tempDesc = weatherService.getTempDescription(minT, maxT);
  const popDesc = weatherService.getPoP12hDescription(pop12h);
  const forecastDate = weatherService.getForecastDate(pop12hTime);
  const confortDesc = weatherService.getConfortDescription(minCI, maxCI);

  return {
    cityName: responseData.locationsName,
    distName: responseData.locationName,
    time: forecastDate,
    pop: pop12h,
    minT: minT,
    maxT: maxT,
    minCI: minCI,
    maxCI: maxCI,
    popDesc: popDesc,
    tempDesc: tempDesc,
    confortDesc: confortDesc,
    wd: weatherDescription,
  };
};


module.exports = {
    getResponse,
    parseResponseData,
}