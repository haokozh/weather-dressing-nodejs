const weatherElement = require('./weather-element.model');

class CWBResponse {
  constructor(records) {
    this.records = records;
  }

  getLocations() {
    return this.records.locations[0];
  }

  getLocation() {
    return this.getLocations().location[0];
  }

  getWeatherElement(indexOfElement) {
    return this.getLocation().weatherElement[indexOfElement];
  }

  getForecastTime(indexOfElement, indexOfTime) {
    return this.getWeatherElement(indexOfElement).time[indexOfTime];
  }

  getElementValue(indexOfElement, indexOfTime, indexOfValue) {
    return this.getForecastTime(indexOfElement, indexOfTime).elementValue[
      indexOfValue
    ];
  }

  getPoPIn12Hours() {
    return this.getElementValue(weatherElement.POP_12H, 0, 0);
  }

  getMinConfortIndex() {
    return this.getElementValue(weatherElement.MIN_CI, 0, 0);
  }

  getMaxConfortIndex() {
    return this.getElementValue(weatherElement.MAX_CI, 0, 0);
  }

  getMinTemperature() {
    return this.getElementValue(weatherElement.MIN_T, 0, 0);
  }

  getMaxTemperature() {
    return this.getElementValue(weatherElement.MAX_T, 0, 0);
  }

  getWeatherDescription() {
    return this.getElementValue(weatherElement.WEATHER_DESCRIPTION, 0, 0);
  }
}

module.exports = CWBResponse;
