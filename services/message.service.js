const { client } = require('../config/linebot.config');

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

// replyWeather
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

// parseResponseToFlexBubble
const replyWeather = async (token, text) => {
  try {
    const elementName = ['MinT', 'MaxT', 'PoP12h', 'Wx', 'MinCI', 'MaxCI'];

    const splitedText = text.split(' ');

    let locationId = linebotService.getWeeklyLocationId(splitedText[0]);
    let locationName = linebotService.getTargetDistByLocationsName(
      splitedText[1],
      splitedText[0]
    );

    message = await linebotService.getWeatherResponse(
      locationId,
      locationName,
      elementName
    );

    return client.replyMessage(
      token,
      linebotService.parseResponseToFlexBubble(message)
    );
  } catch (error) {
    console.error(`Error on linebot.controller.replyWeather(): ${error}`);
  }
};

module.exports = {
  replyText,
  handleMessageEvent,
};
