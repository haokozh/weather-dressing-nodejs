const { client } = require('../config/linebot.config');

const linebotService = require('../services/linebot.service');

const callback = (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((error) => {
      console.error(`Error on linebot.controller.callback() ${error}`);
      res.status(500).end();
    });
};

const handleEvent = async (event) => {
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
};

module.exports = {
  client,
  callback,
  handleEvent,
};
