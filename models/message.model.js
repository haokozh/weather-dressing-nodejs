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

const purposeMessage = {
  type: 'flex',
  altText: 'this is a buttons template',
  contents: {
    type: 'bubble',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '請問出門目的?',
          size: 'lg',
          weight: 'bold',
        },
      ],
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'button',
          action: {
            type: 'postback',
            label: '上班',
            data: '上班',
          },
        },
        {
          type: 'button',
          action: {
            type: 'postback',
            label: '上學',
            data: '上學',
          },
        },
        {
          type: 'button',
          action: {
            type: 'postback',
            label: '出遊',
            data: '出遊',
          },
        },
      ],
    },
  },
};

const dressStyleOneMessage = {
  type: 'imagemap',
  baseUrl: 'https://weather-dressing.herokuapp.com/image/dressStyle/one',
  altText: 'This is an imagemap',
  baseSize: {
    width: 1040,
    height: 1040,
  },
  actions: [
    {
      type: 'message',
      area: {
        x: 0,
        y: 0,
        width: 344,
        height: 526,
      },
      text: '歐美',
    },
    {
      type: 'message',
      area: {
        x: 691,
        y: 0,
        width: 349,
        height: 527,
      },
      text: '日系',
    },
    {
      type: 'message',
      area: {
        x: 0,
        y: 528,
        width: 345,
        height: 512,
      },
      text: '韓系',
    },
    {
      type: 'message',
      area: {
        x: 347,
        y: 532,
        width: 347,
        height: 508,
      },
      text: '正式',
    },
    {
      type: 'message',
      area: {
        x: 693,
        y: 529,
        width: 347,
        height: 511,
      },
      text: '設計',
    },
  ],
};

const dressStyleTwoMessage = {
  type: 'imagemap',
  baseUrl: 'https://weather-dressing.herokuapp.com/imagemap/two',
  altText: 'This is an imagemap',
  baseSize: {
    width: 1040,
    height: 1040,
  },
  actions: [
    {
      type: 'message',
      area: {
        x: 0,
        y: 2,
        width: 342,
        height: 527,
      },
      text: '運動',
    },
    {
      type: 'message',
      area: {
        x: 691,
        y: 2,
        width: 349,
        height: 527,
      },
      text: '潮牌',
    },
    {
      type: 'message',
      area: {
        x: 0,
        y: 531,
        width: 346,
        height: 509,
      },
      text: '台灣品牌',
    },
    {
      type: 'message',
      area: {
        x: 342,
        y: 530,
        width: 353,
        height: 510,
      },
      text: '明星自創',
    },
    {
      type: 'message',
      area: {
        x: 695,
        y: 531,
        width: 345,
        height: 509,
      },
      text: '專櫃品牌',
    },
  ],
};

module.exports = {
  koreanMessage,
  euroMessage,
  japaneseMessage,
  welcomeMessage,
  helpMessage,
  suggestionMessage,
  purposeMessage,
  dressStyleOneMessage,
  dressStyleTwoMessage,
};
