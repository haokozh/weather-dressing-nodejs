class ResponseData {
  constructor(records) {
    this.records = records;
    this.locations = records.locations[0];
    this.location = records.location[0];
  }

  getLocations() {
    return this.locations;
  }

  getLocation() {
    return this.location;
  }

  getWeatherElement(elementIndex) {
    return this.location.weatherElement[elementIndex];
  }

  getTime(elementIndex) {
    return this.getWeatherElement(elementIndex).time[0];
  }

  getValue(elementIndex) {
    return this.getTime(elementIndex).elementValue[0];
  }

  getMeasure(elementIndex) {
    return this.getTime(elementIndex).elementValue[1];
  }
}

module.exports = ResponseData;