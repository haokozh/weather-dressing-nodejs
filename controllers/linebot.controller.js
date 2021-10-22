const linebotService = require('../services/linebot.service');

const callback = (req, res) => {
  Promise.all(req.body.events.map(linebotService.handleEvent))
    .then((result) => res.json(result))
    .catch((error) => {
      console.error(`Error on linebot.controller.callback() ${error}`);
      res.status(500).end();
    });
};

// const handleEvent = (event) => {
//   try {
//     if (linebotService.isWebhookTest(event.replyToken))
//       return Promise.resolve(null);

//     return linebotService.handleWebhookEvent(event);

//   } catch (error) {
//     console.error(`Error on linebot.controller.handleEvent() ${error}`);
//   }
// };

module.exports = {
  callback,
};
