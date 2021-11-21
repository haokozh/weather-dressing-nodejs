const koreanMessage = `
66girls
https://66girls.tw/

mixxmix
http://tw.mixxmix.com/

hotping
https://hotping.com.tw/

stylenanda
https://tw.stylenanda.com/

DABAGIRL
https://www.somethingsweet.com.tw/collections/dabagirl

CHERRYCOCO
https://www.somethingsweet.com.tw/collections/cherrykoko

darkvictory
https://darkvictory.tw/

chuu
https://chuu.com.tw/

lookpine
https://tw.lookpine.net/

NERDY
https://www.whoisnerdy.tw/`;

const euroMessage = `
Zara 
https://www.zara.com/tw/

H&M
https://www2.hm.com/zh_asia3/index.html

GAP
https://www.gap.tw/`;

const japaneseMessage = `
Uniqlo
https://www.uniqlo.com/tw/zh_TW/

RIGHT-ON
https://e.right-on.com.tw/

GLOBAL WORK 
https://www.dot-st.tw/page/globalwork

COEN
https://store.united-arrows.tw/pc/special/coen/

Niko and ...
https://www.dot-st.tw/page/nikoand?lang=zh-TW

SENSE OF PLACE
https://senseofplace.tokyo/

Lowrys Farm
https://www.dot-st.tw/page/lowrysfarm?lang=zh-TW

BEAMS
https://www.beams.tw/

earth music & ecology
https://www.stripe-club.com.tw/v2/official/SalePageCategory/144875?lang=zh-TW

URBAN RESEARCH
https://www.urban-research.tw/

UNITED ARROWS
https://store.united-arrows.tw/

KENZO
https://www.kenzo.com/eu/en/home`;

const welcomeMessage = `歡迎您加入WeatherDressing好友
這裡將提供您即時天氣狀況及穿搭建議
看天氣穿衣服，一起穿出好心晴☀

關鍵字✅ ️
輸入XX縣市 XX鄉鎮市區
➡️可查詢即時天氣

輸入XX度
➡️可查詢穿搭建議

加入會員紀錄與分享你的穿搭✨
    
我們的Instagram
https://www.instagram.com/weather_dressing/`;

const helpMessage = `關鍵字✅ ️
輸入地名：ex. 中壢 or 中壢區
➡️可查詢即時天氣

輸入溫度：ex. 26 or 19度
➡️可查詢穿搭建議`;

const suggestionMessage = {
  type: 'bubble',
  direction: 'ltr',
  header: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: '地點+溫度',
        weight: 'bold',
        size: 'xxl',
        color: '#5051DAFF',
        align: 'center',
      },
    ],
  },
  hero: {
    type: 'image',
    url: 'https://vos.line-scdn.net/bot-designer-template-images/bot-designer-icon.png',
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
};

module.exports = {
  koreanMessage,
  euroMessage,
  japaneseMessage,
  welcomeMessage,
  helpMessage,
  suggestionMessage,
};
