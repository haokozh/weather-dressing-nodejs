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

const isAfter5PM = (time) => {
  return time.getHours() >= 17;
};

const handlePostbackEvent = (event) => {
  try {
    let data = qs.parse(event.postback.data);
    const currentTime = new Date(Date.now());

    if (isDate(data) || isTime(data) || isDateTime(data)) {
      data += `(${JSON.stringify(event.postback.params)})`;
    }

    if (data.action === 'getWeather') {
      return messageService.replyWeatherByCityNameAndDistName(
        event.replyToken,
        data.cityName,
        data.distName
      );
    }

    if (data.action === 'getDressing') {
      let imageName = '';
      if (isAfter5PM(currentTime)) {
        imageName += 'pm_';
      } else {
        imageName += 'am_';
      }

      if (Number(data.pop) >= 30) {
        imageName += 'r_';
      } else {
        imageName += 's_';
      }

      switch (Number(data.purpose)) {
        case 1:
          imageName += '1_';
          break;
        case 2:
          imageName += '2_';
          break;
        case 3:
          imageName += '3_';
          break;
        default:
          throw new Error(`Unknown purpose index ${data.purpose}`);
      }

      let avgT = (Number(data.minT) + Number(data.maxT)) / 2;
      if (avgT > 25) {
        imageName += '25';
      } else if (avgT > 20) {
        imageName += '21';
      } else {
        imageName += '20';
      }

      return messageService.replySuggestionMessage(
        event.replyToken,
        data.cityName,
        data.distName,
        imageName
      );
    }

    return messageService.replyText(event.replyToken, `Got postback: ${data}`);
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
