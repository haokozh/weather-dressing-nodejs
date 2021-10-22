// const { client } = require('../config/linebot.config');

const welcomeMessage = require('../models/welcome-message.model');

const messageService = require('../services/message.service');

// const replyText = (token, texts) => {
//   texts = Array.isArray(texts) ? texts : [texts];

//   return client.replyMessage(
//     token,
//     texts.map((text) => ({
//       type: 'text',
//       text: text,
//     }))
//   );
// };

const handleFollowEvent = (event) => {
  return messageService.replyText(event.replyToken, welcomeMessage);
};

const handleUnfollowEvent = (event) => {
  return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);
};

const handleJoinEvent = (event) => {
  return messageService.replyText(event.replyToken, `Joined ${event.source.type}`);
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

  return messageService.replyText(event.replyToken, `Got postback: ${data}`);
};

const handleBeaconEvent = (event) => {
  return messageService.replyText(event.replyToken, `Got beacon: ${event.beacon.hwid}`);
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
