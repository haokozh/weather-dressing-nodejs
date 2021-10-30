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
  return replyWeather(token, message.text);
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

    let queryResult = await weatherService.findWeeklyForecastIdByDistName(text);

    if (queryResult.length > 1) {
      const postbackMessage = {
        type: 'flex',
        altText: 'Postback Message',
        contents: {
          type: 'bubble',
          size: 'giga',
          direction: 'ltr',
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: '請選擇地區',
                weight: 'bold',
              },
              {
                type: 'separator',
                margin: 'md',
              },
              {
                type: 'button',
                action: {
                  type: 'postback',
                  label: '新竹市 東區',
                  data: '新竹市 東區',
                },
              },
              {
                type: 'button',
                action: {
                  type: 'postback',
                  label: '嘉義市 東區',
                  data: '嘉義市 東區',
                },
              },
            ],
          },
        },
      };

      return client.replyMessage(token, postbackMessage);
    }

    let forecastId = queryResult[0].weeklyid;
    let distName = queryResult[0].distname;

    const message = await weatherService.getWeatherResponse(
      forecastId,
      distName,
      elementParams
    );

    return client.replyMessage(
      token,
      weatherService.parseResponseToFlexBubble(message)
    );
  } catch (error) {
    console.error(`Error on message.service.replyWeather(): ${error.stack}`);
  }
};

module.exports = {
  replyText,
  handleMessageEvent,
};
