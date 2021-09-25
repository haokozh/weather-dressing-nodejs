const isWebhookTest = require('../lib/isWebhookTest');

const getWeatherResponse = require('../lib/getWeatherResponse');
const get48HoursLocationId = require('../lib/get48HoursLocationId');
const getWeeklyLocationId = require('../lib/getWeeklyLocationId');
const getTargetDistByLocationsName = require('../lib/getTargetDistByLocationsName');

async function handleEvent(event) {
    if (isWebhookTest(event.replyToken)) return Promise.resolve(null);
  
    const elementName = ['MinT', 'MaxT', 'PoP12h', 'Wx', 'MinCI', 'MaxCI'];
  
    const originalText = event.message.text;
    const splitedText = originalText.split(' ');
  
    let locationId = getWeeklyLocationId(splitedText[0]);
    let locationName = getTargetDistByLocationsName(
      splitedText[1],
      splitedText[0]
    );
  
    replyMessage = await getWeatherResponse(
      locationId,
      locationName,
      elementName
    );
  
    return client.replyMessage(event.replyToken, replyMessage);
  }

  module.exports.handleEvent = handleEvent;