const { client } = require('../config/linebot.config');

const weatherService = require('../services/weather.service');

const { elementParams } = require('../models/weather-element.model');
const {
  japaneseMessage,
  koreanMessage,
  euroMessage,
  helpMessage,
  dressStyleOneMessage,
  dressStyleTwoMessage,
  sportMessage,
  weatherMessage,
  fashionMessage,
  formalMessage,
  taiwaneseMessage,
  artistMessage,
  designerMessage,
  counterBrandMessage,
} = require('../models/message.model');

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
  return replyText(token, helpMessage);
};

const replyWeatherMessage = (token) => {
  return replyText(token, weatherMessage);
};

const replySuggestionMessage = (token, cityName, distName, avgT, imageName) => {
  return client.replyMessage(token, [
    getSuggestionMessage(cityName, distName, avgT, imageName, 'jpg'),
    getSuggestionMessage(cityName, distName, avgT, imageName, 'png'),
  ]);
};

const replyRecommandMessage = (token) => {
  return client.replyMessage(token, [
    dressStyleOneMessage,
    dressStyleTwoMessage,
  ]);
};

const replyUnknownMessage = (token) => {
  return replyText(token, '?');
};

const handleText = (token, message) => {
  let keyword = message.text.toLowerCase().trim();

  switch (keyword) {
    case 'h':
    case 'help':
      return replyHelpMessage(token);

    case '天氣':
    case '查詢天氣及穿搭':
    case 'weather':
      return replyWeatherMessage(token);

    case '推薦':
    case '品牌推薦':
    case 'recommend':
      return replyRecommandMessage(token);

    case '日系':
      return client.replyMessage(token, japaneseMessage);

    case '韓系':
      return client.replyMessage(token, koreanMessage);

    case '歐系':
    case '歐美':
      return client.replyMessage(token, euroMessage);

    case '運動':
    case 'sport':
      return client.replyMessage(token, sportMessage);

    case '正式':
      return client.replyMessage(token, formalMessage);

    case '設計':
      return client.replyMessage(token, designerMessage);

    case '台灣品牌':
      return client.replyMessage(token, taiwaneseMessage);

    case '明星自創':
      return client.replyMessage(token, artistMessage);

    case '專櫃品牌':
      return client.replyMessage(token, counterBrandMessage);

    case '潮牌': 
      return client.replyMessage(token, fashionMessage);

    default:
      return replyWeather(token, keyword);
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

const getSuggestionMessage = (
  cityName,
  distName,
  avgT,
  imageName,
  imageType
) => {
  return {
    type: 'flex',
    altText: 'suggestion message',
    contents: {
      type: 'bubble',
      direction: 'ltr',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: `${cityName} ${distName} ${avgT}°C`,
            weight: 'bold',
            size: 'md',
            color: '#55DAFF',
            align: 'center',
          },
        ],
      },
      hero: {
        type: 'image',
        url: `https://weather-dressing.herokuapp.com/image/suggestion/${imageName}.${imageType}`,
        size: 'full',
        aspectRatio: '1.51:1',
        aspectMode: 'fit',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '穿搭建議',
            weight: 'bold',
            size: 'xxl',
            color: '#2C672DFF',
            align: 'center',
          },
        ],
      },
    },
  };
};

const getPostbackButton = (cityName, distName) => {
  return {
    type: 'button',
    action: {
      type: 'postback',
      label: `${cityName} ${distName}`,
      data: `action=getWeather&cityName=${cityName}&distName=${distName}`,
    },
  };
};

const getPostbackTitle = (text) => {
  return {
    type: 'text',
    text: `請問是哪個${text}?`,
    size: 'xl',
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

const replyWeatherByCityNameAndDistName = async (token, cityName, distName) => {
  try {
    let forecastId = await weatherService.findWeeklyForecastIdByCityName(
      cityName
    );

    const weatherResponse = await weatherService.getWeatherResponse(
      forecastId,
      distName,
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
      let forecastId = queryResult[0].forecastid;
      let distName = queryResult[0].distname;

      const weatherResponse = await weatherService.getWeatherResponse(
        forecastId,
        distName,
        elementParams
      );

      message = weatherService.parseResponseToFlexBubble(weatherResponse);

      console.log(message);
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
  replySuggestionMessage,
};
