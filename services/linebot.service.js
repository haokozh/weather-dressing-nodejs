const eventService = require('../services/event.service');

const isWebhookTest = (replyToken) => {
  return (
    replyToken === '00000000000000000000000000000000' ||
    replyToken === 'ffffffffffffffffffffffffffffffff'
  );
};

const handleEvent = (event) => {
  try {
    if (isWebhookTest(event.replyToken)) return Promise.resolve(null);

    return handleWebhookEvent(event);
  } catch (error) {
    console.error(`Error on linebot.controller.handleEvent() ${error}`);
  }
};

const handleWebhookEvent = (event) => {
  return eventService.handleWebhookEvent(event);
};

module.exports = {
  isWebhookTest,
  handleEvent,
};
