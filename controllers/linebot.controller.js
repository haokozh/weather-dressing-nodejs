const { client } = require('../config/linebot.config');

const linebotService = require('../services/linebot.service');
const welcomeMessage = require('../models/welcome-message.model');

const callback = (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((error) => {
      console.error(`Error on linebot.controller.callback() ${error}`);
      res.status(500).end();
    });
};

const handleEvent = (event) => {
  try {
    if (linebotService.isWebhookTest(event.replyToken))
      return Promise.resolve(null);

    return handleWebhookEvent(event);

  } catch (error) {
    console.error(`Error on linebot.controller.handleEvent() ${error}`);
  }
};

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

const handleFollowEvent = (event) => {
  return replyText(event.replyToken, welcomeMessage);
};

const handleUnfollowEvent = (event) => {
  return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);
};

const handleJoinEvent = (event) => {
  return replyText(event.replyToken, `Joined ${event.source.type}`);
};

const handleLeaveEvent = (event) => {
  return console.log(`Left: ${JSON.stringify(event)}`);
};

const isDate = (data) => {
  return data === 'DATE';
};

const isTime = (data) => {
  return data === 'TIME';
};

const isDateTime = (data) => {
  return data === 'DATETIME';
};

const handlePostbackEvent = (event) => {
  let data = event.postback.data;

  if (isDate(data) || isTime(data) || isDateTime(data)) {
    data += `(${JSON.stringify(event.postback.params)})`;
  }

  return replyText(event.replyToken, `Got postback: ${data}`);
};

const handleBeaconEvent = (event) => {
  return replyText(event.replyToken, `Got beacon: ${event.beacon.hwid}`);
};

const throwUnknownEventError = (event) => {
  throw new Error(`Unknown event: ${JSON.stringify(event)}`);
};

const webhookEvents = {
  message: handleMessageEvent,
  follow: handleFollowEvent,
  unfollow: handleUnfollowEvent,
  join: handleJoinEvent,
  leave: handleLeaveEvent,
  postback: handlePostbackEvent,
  beacon: handleBeaconEvent,
  default: throwUnknownEventError,
};

const handleWebhookEvent = (event) => {
  return webhookEvents[event.type](event);
};

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
  client,
  callback,
  handleEvent,
};
