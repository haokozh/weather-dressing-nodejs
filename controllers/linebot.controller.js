const { client } = require('../config/linebot.config');

const linebotService = require('../services/linebot.service');

const callback = (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((error) => {
      console.error(`Error on linebot.controller.callback() ${error}`);
      res.status(500).end();
    });
};

const handleEvent = async (event) => {
  try {
    if (linebotService.isWebhookTest(event.replyToken))
      return Promise.resolve(null);

    // not tested
    const welcomeMessage = `歡迎您加入WeatherDressing好友
  這裡將提供您即時天氣狀況及穿搭建議
  看天氣穿衣服，一起穿出好心晴☀️
  
  關鍵字☑️
  輸入XX縣市 XX鄉鎮市區
  ➡️可查詢即時天氣
  
  輸入XX度
  ➡️可查詢穿搭建議
  
  加入會員紀錄與分享你的穿搭✨
  
  我們的Instagram
  https://www.instagram.com/weather_dressing/`;

    if (event.type === 'follow') {
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: welcomeMessage,
      });
    }

    if (event.type === 'message') {
      const elementName = ['MinT', 'MaxT', 'PoP12h', 'Wx', 'MinCI', 'MaxCI'];

      const originalText = event.message.text;
      const splitedText = originalText.split(' ');

      let locationId = linebotService.getWeeklyLocationId(splitedText[0]);
      let locationName = linebotService.getTargetDistByLocationsName(
        splitedText[1],
        splitedText[0]
      );

      replyMessage = await linebotService.getWeatherResponse(
        locationId,
        locationName,
        elementName
      );

      return client.replyMessage(
        event.replyToken,
        linebotService.parseResponseToFlexBubble(replyMessage)
      );
    }
  } catch (error) {
    console.error(`Error on linebot.controller.handleEvent() ${error}`);
  }
};

module.exports = {
  client,
  callback,
  handleEvent,
};
