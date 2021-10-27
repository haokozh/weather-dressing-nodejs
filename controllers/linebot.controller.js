const linebotService = require('../services/linebot.service');

const callback = (req, res) => {
  Promise.all(req.body.events.map(linebotService.handleEvent))
    .then((result) => res.json(result))
    .catch((error) => {
      console.error(`Error on linebot.controller.callback() ${error}`);
      res.status(res.statusCode).end();
    });
};

module.exports = {
  callback,
};
