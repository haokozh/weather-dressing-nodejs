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

// hard code
const handleText = (token, message) => {
  const originalText = message.text;
  const splitedText = originalText.split(' ');
  const cityName = splitedText[0];
  const distName = splitedText[1];
  const weatherResult = weatherService.replyWeather(cityName, distName);
  
  return client.replyMessage(token, weatherResult);
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

module.exports = {
  replyText,
  handleMessageEvent,
};
