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
  let data = event.postback.data;
  const params = event.postback.params;
  const currentTime = new Date(Date.now());

  if (isDate(data) || isTime(data) || isDateTime(data)) {
    data += `(${JSON.stringify(event.postback.params)})`;
  }

  if (data === 'manyDistOptions') {
    // return messageService.replyWeatherByCityNameAndDistName(
    //   event.replyToken,
    //   params.city,
    //   params.dist
    // );
    return messageService.replyText('Got Options Postback Data');
  }

  if (data === '上班' || data === '上學' || data === '出遊') {
    // return messageService.replyText(`city: ${params.city}
    // dist: ${params.dist}
    // pop: ${params.pop}
    // mint: ${params.minT}
    // maxt: ${params.maxT}
    // purpose: ${data}
    // currentTime: ${currentTime.getHours()}`);

    return messageService.replyText('Got work Postback Data');
  }

  return messageService.replyText('Got Postback Data');
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
