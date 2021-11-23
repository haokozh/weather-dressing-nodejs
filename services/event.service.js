const qs = require('qs');
const messageService = require('../services/message.service');

const { welcomeMessage } = require('../models/message.model');

const handleFollowEvent = (event) => {
  return messageService.replyText(event.replyToken, welcomeMessage);
};

const handleUnfollowEvent = (event) => {
  return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);
};

const handleJoinEvent = (event) => {
  return messageService.replyText(
    event.replyToken,
    `Joined ${event.source.type}`
  );
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
  try {
    let data = qs.parse(event.postback.data);
    const currentTime = new Date(Date.now());

    if (isDate(data) || isTime(data) || isDateTime(data)) {
      data += `(${JSON.stringify(event.postback.params)})`;
    }

    if (data.action === 'getWeather') {
      return messageService.replyText(event.replyToken, `city: ${data.cityName} dist: ${data.distName}`);
    }

    if (data.action === 'getDressing') {
      return messageService.replyText(event.replyToken, `city: ${data.cityName} dist: ${data.distName} pop: ${data.pop} minT: ${data.minT} maxT: ${data.maxT}`);
    }

    return messageService.replyText(
      event.replyToken,
      `Got postback: ${data}`
    );
  } catch (error) {
    console.error(`Error on event.service.handlePostbackEvent(): ${error}`);
  }
};

const handleBeaconEvent = (event) => {
  return messageService.replyText(
    event.replyToken,
    `Got beacon: ${event.beacon.hwid}`
  );
};

const throwUnknownEventError = (event) => {
  throw new Error(`Unknown event: ${JSON.stringify(event)}`);
};

const webhookEvents = {
  message: messageService.handleMessageEvent,
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

module.exports = {
  handleWebhookEvent,
};
