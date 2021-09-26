// const axios = require('axios');
// const qs = require('qs');

// const replyFlexBubble = require('../message/replyFlexBubbleMessage');

// const weatherElement = {
//   POP_12H: 0,
//   MIN_CI: 1,
//   WEATHER_DESCRIPTION: 2,
//   MAX_CI: 3,
//   MIN_T: 4,
//   MAX_T: 5,
// };

// class ResponseData {
//   constructor(records) {
//     this.records = records;
//   }

//   getLocations() {
//     return this.records.locations[0];
//   }

//   getLocation() {
//     return this.getLocations().location[0];
//   }

//   getWeatherElement(elementIndex) {
//     return this.getLocation().weatherElement[elementIndex];
//   }

//   getTime(elementIndex) {
//     return this.getWeatherElement(elementIndex).time[0];
//   }

//   getValue(elementIndex) {
//     return this.getTime(elementIndex).elementValue[0];
//   }

//   getMeasure(elementIndex) {
//     return this.getTime(elementIndex).elementValue[1];
//   }
// }

async function getWeatherResponse(locationId, locationName, elementName) {
  const baseURL =
    'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-093';

  const weatherResponse = await axios.get(baseURL, {
    params: {
      Authorization: process.env.CWB_API_KEY,
      locationId: locationId,
      locationName: locationName,
      elementName: elementName,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });

  const responseData = new ResponseData(weatherResponse.data.records);

  const locations = responseData.getLocations();
  const location = responseData.getLocation();

  const pop12hTime = responseData.getTime(weatherElement.POP_12H);
  const pop12hValue = responseData.getValue(weatherElement.POP_12H);
  const pop12hDescription = `${pop12hValue.value}%`;

  const wdValue = responseData.getValue(weatherElement.WEATHER_DESCRIPTION);

  const minTempValue = responseData.getValue(weatherElement.MIN_T);
  const maxTempValue = responseData.getValue(weatherElement.MAX_T);
  const tempDescription = `${minTempValue.value}°C ~ ${maxTempValue.value}°C`;

  // some problem
  const minCIValue = responseData.getMeasure(weatherElement.MIN_CI);
  const maxCIValue = responseData.getMeasure(weatherElement.MAX_CI);

  // if minCI === maxCI
  const confortDescription = `${minCIValue.value}至${maxCIValue.value}`;

  return replyFlexBubble(
    locations,
    location,
    pop12hTime,
    pop12hDescription,
    wdValue,
    tempDescription,
    confortDescription
  );
}

module.exports = getWeatherResponse;
