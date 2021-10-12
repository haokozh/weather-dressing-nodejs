const { client } = require('../config/linebot.config');

const linebotService = require('../services/linebot.service');
const welcomeMessage = require('../models/welcome-message.model');
const { text } = require('../models/welcome-message.model');

const callback = (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((error) => {
      console.error(`Error on linebot.controller.callback() ${error}`);
      res.status(500).end();
    });
};

const handleEvent = async (event) => {
  try {
    if (linebotService.isWebhookTest(event.replyToken))
      return Promise.resolve(null);

    switch (event.type) {
      case 'message':
        const message = event.message;
        switch (message.type) {
          case 'text':
            return await replyWeather(event.replyToken, message.text);
          case 'image':
          case 'video':
          case 'audio':
          case 'file':
          case 'location':
          case 'sticker':
            return client.replyMessage(event.replyToken, {
              type: 'text',
              text: 'Not Supported',
            });
          default:
            throw new Error(`Unknown message: ${JSON.stringify(message)}`);
        }

      case 'follow':
        return client.replyMessage(event.replyToken, welcomeMessage);

      case 'unfollow':
        return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

      case 'join':
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: `Joined ${event.source.type}`
        });

      case 'leaven':
        return console.log(`Left: ${JSON.stringify(event)}`);

      case 'postback':
        let data = event.postback.data;
        if (data === 'DATE' || data === 'TIME' || data === 'DATETIME') {
          data += `(${JSON.stringify(event.postback.params)})`;
        }

        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: `Got postback: ${data}`
        });

      case 'beacon':
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: `Got beacon: ${event.beacon.hwid}`
        });

      default:
        throw new Error(`Unknown event: ${JSON.stringify(event)}`);
    }

  } catch (error) {
    console.error(`Error on linebot.controller.handleEvent() ${error}`);
  }
};

const replyWeather = async (token, text) => {
  const elementName = ['MinT', 'MaxT', 'PoP12h', 'Wx', 'MinCI', 'MaxCI'];

  const splitedText = text.split(' ');

  let locationId = linebotService.getWeeklyLocationId(splitedText[0]);
  let locationName = linebotService.getTargetDistByLocationsName(
    splitedText[1],
    splitedText[0]
  );

  replyMessage = await linebotService.getWeatherResponse(
    locationId,
    locationName,
    elementName
  );

  return client.replyMessage(
    token,
    linebotService.parseResponseToFlexBubble(replyMessage)
  );
};

module.exports = {
  client,
  callback,
  handleEvent,
};
