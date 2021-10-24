class ResponseData {
  constructor(records) {
    this.records = records;

    this.locationsName = this.getLocations(0).locationsName;
    this.locationName = this.getLocation(0).locationName;
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