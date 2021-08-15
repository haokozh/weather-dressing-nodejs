export default class ResponseData {
  
    constructor(records) {
      this.records = records;
    }
  
    getLocations() {
      return this.records.locations[0];
    }
  
    getLocation() {
      return this.getLocations().location[0];
    }
  
    getWeatherElement(elementIndex) {
      return this.getLocation().weatherElement[elementIndex];
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