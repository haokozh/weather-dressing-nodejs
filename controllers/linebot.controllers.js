const line = require('@line/bot-sdk');
const linebotConfig = require('../config/linebot');

const linebotService = require('../services/linebot.services');

const client = new line.Client({
  channelSecret: linebotConfig.channelSecret,
  channelAccessToken: linebotConfig.channelAccessToken,
});

const linebotMiddleware = line.middleware(client.config);

function handleLineResponse(linebotMiddleware, req, res) {
  Promise.all(req.body.events.map(linebotController.handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
}

async function handleEvent(event) {
  if (linebotService.isWebhookTest(event.replyToken))
    return Promise.resolve(null);

  const elementName = ['MinT', 'MaxT', 'PoP12h', 'Wx', 'MinCI', 'MaxCI'];

  const originalText = event.message.text;
  const splitedText = originalText.split(' ');

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

  return client.replyMessage(event.replyToken, replyMessage);
}

module.exports.handleLineResponse = handleLineResponse;
