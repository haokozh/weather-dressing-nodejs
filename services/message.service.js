const { client } = require('../config/linebot.config');

const weatherService = require('../services/weather.service');
const elementParams = require('../models/weather-element.model').elementName;

const replyText = (token, texts) => {
  texts = Array.isArray(texts) ? texts : [texts];

  return client.replyMessage(
    token,
    texts.map((text) => ({
      type: 'text',
      text: text,
    }))
  );
};

const handleText = (token, message) => {
  let replyMessage = '';

  switch (message.text) {
    case 'h':
    case 'help':
      replyMessage = 'help';
      break;

    case '天氣':
    case 'weather':
      replyMessage = '要查詢哪裡的天氣';
      break;

    case '建議':
    case '穿搭建議':
    case 'suggestion':
      replyMessage = '目前沒有建議的穿搭';
      break;

    case '推薦':
    case '品牌推薦':
    case 'recommand':
      replyMessage = '目前沒有推薦的網站';
      break;

    case '網頁':
    case '網站':
    case 'website':
    case 'web':
      replyMessage = '網站連結';
      break;

    case 'IG':
    case 'ig':
    case 'instagram':
      replyMessage = 'IG連結';
      break;

    default:
      replyMessage = '?';
  }

  // if (message.text === 'h' || message.text === 'help') {
  //   return replyText(token, 'help');
  // } else if (message.text === '天氣' || message.text === 'weather') {
  //   return replyText(token, '要查詢哪裡的天氣');
  // } else if (
  //   message.text === '建議' ||
  //   message.text === '穿搭建議' ||
  //   message.text === 'suggestion'
  // ) {
  //   return replyText(token, '目前沒有建議的穿搭');
  // } else if (
  //   message.text === '推薦' ||
  //   message.text === '品牌推薦' ||
  //   message.text === 'recommand'
  // ) {
  //   return replyText(token, '目前沒有推薦的網站');
  // } else if (
  //   message.text === '網頁' ||
  //   message.text === 'website' ||
  //   message.text === 'web'
  // ) {
  //   return replyText(token, '網站連結');
  // } else if (
  //   message.text === 'IG' ||
  //   message.text === 'instagram' ||
  //   message.text === 'ig'
  // ) {
  //   return replyText(token, 'IG連結');
  // } else {
  //   return replyText(token, '?');
  // }

  return replyText(token, replyMessage);
};

const handleImage = (token, message) => {
  return replyText(token, '正在想如何用圖片訊息上傳照片');
};

const handleVideo = (token, message) => {
  return replyText(token, '我要怎麼看影片？');
};

const handleAudio = (token, message) => {
  return replyText(token, '聽不到');
};

const handleFile = (token, message) => {
  return replyText(token, '傳檔案應該也不會有反應');
};

const handleLocation = (token, message) => {
  return replyText(token, '正在想如何用位置訊息查詢天氣');
};

const handleSticker = (token, message) => {
  return replyText(token, '看來傳貼圖並沒有反應');
};

const throwUnknownMessageError = (message) => {
  throw new Error(`未知的訊息 : ${JSON.stringify(message)}`);
};

const messageEvents = {
  text: handleText,
  image: handleImage,
  video: handleVideo,
  audio: handleAudio,
  file: handleFile,
  location: handleLocation,
  sticker: handleSticker,
  default: throwUnknownMessageError,
};

const handleMessageEvent = (event) => {
  return (
    messageEvents[event.message.type](event.replyToken, event.message) ||
    messageEvents['default'](event.message)
  );
};

const replyWeather = async (token, text) => {
  try {
    // todo:
    // 如果 輸入 xx市 xx區
    // 需要確認 xx市 有 xx區

    // 如果 輸入 xx區
    // 如果 有重複 ex. 東區, 西區, 大安區, 中山區, 中正區, 信義區
    // 詢問使用者是哪一個
    // 如果 沒有重複
    // 回傳 xx區天氣資訊

    let message;
    let queryResult = await weatherService.findWeeklyForecastIdByDistName(text);

    if (queryResult.length === 1) {
      let forecastId = queryResult[0].weeklyid;
      let distName = queryResult[0].distname;

      weatherResponse = await weatherService.getWeatherResponse(
        forecastId,
        distName,
        elementParams
      );

      message = weatherService.parseResponseToFlexBubble(weatherResponse);
    } else {
      message = {
        type: 'text',
        text: 'queryResult > 1',
      };
    }

    return client.replyMessage(token, message);
  } catch (error) {
    console.error(`Error on message.service.replyWeather(): ${error.stack}`);
  }
};

module.exports = {
  replyText,
  handleMessageEvent,
};
