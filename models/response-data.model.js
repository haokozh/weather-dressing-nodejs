const weatherElement = require('../models/weather-element.model');

class ResponseData {
  constructor(records) {
    this.records = records;
  }

  getCity() {
    return this.records.locations[0];
  }

  getDist() {
    return this.getCity().location[0];
  }

  getWeatherElement(indexOfElement) {
    return this.getDist().getWeatherElement[indexOfElement];
  }

  getForecastTime(indexOfElement, indexOfTime) {
    return this.getWeatherElement(indexOfElement).time[indexOfTime];
  }

  getElementValue(indexOfElement, indexOfTime, indexOfValue) {
    return this.getForecastTime(indexOfElement, indexOfTime).elementValue[
      indexOfValue
    ];
  }

  getMinTemperature(indexOfTime) {
    return this.getElementValue(weatherElement.MIN_T, indexOfTime, 0);
  }

  getMaxTemperature(indexOfTime) {
    return this.getElementValue(weatherElement.MAX_T, indexOfTime, 0);
  }

  getPoPIn12Hours(indexOfTime) {
    return this.getElementValue(weatherElement.POP_12H, indexOfTime, 0);
  }

  getWeatherDescription(indexOfTime) {
    return this.getElementValue(
      weatherElement.WEATHER_DESCRIPTION,
      indexOfTime,
      0
    );
  }

  getMinConfortIndex(indexOfTime) {
    return this.getElementValue(weatherElement.MIN_CI, indexOfTime, 1);
  }

  getMaxConfortIndex(indexOfTime) {
    return this.getElementValue(weatherElement.MAX_CI, indexOfTime, 1);
  }
}

module.exports = ResponseData;
