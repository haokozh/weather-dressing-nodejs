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

    switch (event.type) {
      case 'message':
        return handleMessageEvent(
          message.type,
          event.replyToken,
          event.message
        );

      case 'follow':
        return client.replyMessage(event.replyToken, welcomeMessage);

      case 'unfollow':
        return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

      case 'join':
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: `Joined ${event.source.type}`,
        });

      case 'leave':
        return console.log(`Left: ${JSON.stringify(event)}`);

      case 'postback':
        let data = event.postback.data;
        if (data === 'DATE' || data === 'TIME' || data === 'DATETIME') {
          data += `(${JSON.stringify(event.postback.params)})`;
        }

        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: `Got postback: ${data}`,
        });

      case 'beacon':
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: `Got beacon: ${event.beacon.hwid}`,
        });

      default:
        throw new Error(`Unknown event: ${JSON.stringify(event)}`);
    }
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

const messageEvents = {
  'text': handleText(token, message),
  'image': handleImage(token, message),
  'video': handleVideo(token, message),
  'audio': handleAudio(token, message),
  'file': handleFile(token, message),
  'location': handleLocation(token, message),
  'sticker': handleSticker(token, message),
};

const handleMessageEvent = (messageType, token, message) => {
  return (
    messageEvents[messageType](token, message) ||
    throwUnknownMessageError(message)
  );
};

const throwUnknownMessageError = (message) => {
  throw new Error(`Unknown message: ${JSON.stringify(message)}`);
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
