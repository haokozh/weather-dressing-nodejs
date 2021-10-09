class ResponseData {
  constructor(records) {
    this.records = records;

    this.locationsName = this.getLocations(0).locationsName;
    this.locationName = this.getLocation(0).locationName;

    // this.pop12hDescription = this.getWeatherElement(0, 0).description;
    // this.minCIDescription = this.getWeatherElement(0, 1).description;
    // this.weatherDescription = this.getWeatherElement(0, 2).description;
    // this.maxCIDescription = this.getWeatherElement(0, 3).description;
    // this.minTDescription = this.getWeatherElement(0, 4).description;
    // this.maxTDescription = this.getWeatherElement(0, 5).description;
  }

  getLocations(locationIndex) {
    return this.records.locations[locationIndex];
  }

  getLocation(locationIndex) {
    return this.getLocations(locationIndex).location[locationIndex];
  }

  getWeatherElement(locationIndex, elementIndex) {
    return this.getLocation(locationIndex).weatherElement[elementIndex];
  }

  getTime(locationIndex, elementIndex, timeIndex) {
    return this.getWeatherElement(locationIndex, elementIndex).time[timeIndex];
  }

  getElementValue(locationIndex, elementIndex, timeIndex, valueIndex) {
    return this.getTime(locationIndex, elementIndex, timeIndex).elementValue[
      valueIndex
    ];
  }
}

module.exports = ResponseData;