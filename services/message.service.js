const { client } = require('../config/linebot.config');

const weatherService = require('../services/weather.service');

const replyText = (token, texts) => {
  texts = Array.isArray(texts) ? texts : [texts];

  return client.replyMessage(
    token,
    texts.map((text) => ({
      type: 'text',
      text: text,
    }))
  );
};

const handleText = (token, message) => {
  return replyWeather(token, message.text);
};

const handleImage = (token, message) => {
  return replyText(token, 'Image Message is Not Supported');
};

const handleVideo = (token, message) => {
  return replyText(token, 'Video Message is Not Supported');
};

const handleAudio = (token, message) => {
  return replyText(token, 'Audio Message is Not Supported');
};

const handleFile = (token, message) => {
  return replyText(token, 'File Message is Not Supported');
};

const handleLocation = (token, message) => {
  return replyText(token, 'Location Message is Not Supported');
};

const handleSticker = (token, message) => {
  return replyText(token, 'Sticker Message is Not Supported');
};

const throwUnknownMessageError = (message) => {
  throw new Error(`Unknown message: ${JSON.stringify(message)}`);
};

const messageEvents = {
  text: handleText,
  image: handleImage,
  video: handleVideo,
  audio: handleAudio,
  file: handleFile,
  location: handleLocation,
  sticker: handleSticker,
  default: throwUnknownMessageError,
};

const handleMessageEvent = (event) => {
  return (
    messageEvents[event.message.type](event.replyToken, event.message) ||
    messageEvents['default'](event.message)
  );
};

const replyWeather = async (token, text) => {
  try {
    const elementName = ['MinT', 'MaxT', 'PoP12h', 'Wx', 'MinCI', 'MaxCI'];

    const splitedText = text.split(' ');

    // let locationId = weatherService.getWeeklyLocationId(splitedText[0]);
    // let locationName = weatherService.getTargetDistByLocationsName(
    //   splitedText[1],
    //   splitedText[0]
    // );

    // const message = await weatherService.getWeatherResponse(
    //   locationId,
    //   locationName,
    //   elementName
    // );

    let forecastId = weatherService.findWeeklyForecastIdByCityName(cityName);
    let distName = splitedText[1];

    const message = await weatherService.getWeatherResponse(
      forecastId,
      distName,
      elementName
    );

    return client.replyMessage(
      token,
      weatherService.parseResponseToFlexBubble(message)
    );
  } catch (error) {
    console.error(`Error on message.service.replyWeather(): ${error.stack}`);
  }
};

module.exports = {
  replyText,
  handleMessageEvent,
};
