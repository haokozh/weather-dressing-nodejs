const weatherElement = require('./weather-element.model');

class CWBResponse {
  constructor(records, locationsIndex, locationIndex) {
    this.records = records;
    this.locationsIndex = locationsIndex;
    this.locationIndex = locationIndex;
  }

  getLocations() {
    return this.records.locations[this.locationsIndex];
  }

  getLocation() {
    return this.getLocations().location[this.locationIndex];
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
