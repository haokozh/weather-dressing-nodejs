const { client } = require('../config/linebot.config');

const weatherService = require('../services/weather.service');
const elementParams = require('../models/weather-element.model').elementName;
const { japaneseRecommandMessage } = require('../models/recommand-message.model');
const { koreanRecommandMessage } = require('../models/recommand-message.model');

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

const replyHelpMessage = (token) => {
  return replyText(token, 'help');
};

const replyWeatherMessage = (token) => {
  return replyText(token, '現在只能輸入鄉鎮市區的地名');
};

const replySuggestionMessage = (token) => {
  return replyText(token, '目前沒有建議的穿搭');
};

const replyRecommandMessage = (token) => {
  return replyText(token, '現在有日系和韓系的推薦網站');
};

const replyWebsiteLink = (token) => {
  return replyText(token, '我們的網站 : https://weather-dressing.herokuapp.com/');
};

const replyInstagramLink = (token) => {
  return replyText(token, '我們的 Instagram : https://www.instagram.com/weather_dressing/');
};

const replyUnknownMessage = (token) => {
  return replyText(token, '?');
};

const handleText = (token, message) => {
  let keyword = message.text.toLowerCase();

  switch (keyword) {
    case 'h':
    case 'help':
      return replyHelpMessage(token);

    case '天氣':
    case 'weather':
      return replyWeatherMessage(token);

    case '建議':
    case '穿搭建議':
    case 'suggestion':
      return replySuggestionMessage(token);

    case '推薦':
    case '品牌推薦':
    case 'recommand':
      return replyRecommandMessage(token);

    case '日系':
      return replyText(token, japaneseRecommandMessage);

    case '韓系':
      return replyText(token, koreanRecommandMessage);

    case 'ig':
      return replyInstagramLink(token);

    case '網頁':
    case '網站':
    case 'website':
      return replyWebsiteLink(token);

    default:
      return replyWeather(token, message.text);
  }
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
const getPostbackButton = (cityName, distName) => {
  return {
    type: 'button',
    action: {
      type: 'postback',
      label: `${cityName} ${distName}`,
      data: `${cityName} ${distName}`,
    },
  };
};

const getPostbackTitle = (text) => {
  return {
    type: 'text',
    text: `請問是哪個${text}?`,
    size: 'xxl',
  };
};

const getPostbackMessage = (queryResult, text) => {
  let contants = [getPostbackTitle(text)];
  queryResult.forEach((record) => {
    contants.push(getPostbackButton(record.cityname, record.distname));
  });

  return {
    type: 'flex',
    altText: 'this is flex message',
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: contants,
      },
    },
  };
};

const replyWeatherByCityNameAndDistName = async (token, text) => {
  try {
    splitedText = text.split(' ');
    let queryResultForecastId =
      await weatherService.findWeeklyForecastIdByCityName(splitedText[0]);

    const weatherResponse = await weatherService.getWeatherResponse(
      queryResultForecastId,
      splitedText[1],
      elementParams
    );

    const message = weatherService.parseResponseToFlexBubble(weatherResponse);

    return client.replyMessage(token, message);
  } catch (error) {
    console.error(`Error on replyWeatherByCityNameAndDistName(): ${error}`);
  }
};

const isOneResult = (length) => {
  return length === 1;
};

const isManyResult = (length) => {
  return length > 1;
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

    if (isOneResult(queryResult.length)) {
      let forecastId = queryResult[0].weeklyid;
      let distName = queryResult[0].distname;

      const weatherResponse = await weatherService.getWeatherResponse(
        forecastId,
        distName,
        elementParams
      );

      message = weatherService.parseResponseToFlexBubble(weatherResponse);
    } else if (isManyResult(queryResult.length)) {
      message = getPostbackMessage(queryResult, text);
    } else {
      message = {
        type: 'text',
        text: `找不到 ${text}`,
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
  replyWeatherByCityNameAndDistName,
};
