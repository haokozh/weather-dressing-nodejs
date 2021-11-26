const richmenu = {
  size: {
    width: 2500,
    height: 1686,
  },
  selected: true,
  name: '圖文選單 1',
  chatBarText: '查看更多資訊',
  areas: [
    {
      bounds: {
        x: 0,
        y: 0,
        width: 2500,
        height: 836,
      },
      action: {
        type: 'message',
        text: '查詢天氣及穿搭',
      },
    },
    {
      bounds: {
        x: 0,
        y: 831,
        width: 853,
        height: 855,
      },
      action: {
        type: 'message',
        text: '品牌推薦',
      },
    },
    {
      bounds: {
        x: 853,
        y: 836,
        width: 824,
        height: 850,
      },
      action: {
        type: 'uri',
        uri: 'https://weather-dressing.herokuapp.com/',
      },
    },
    {
      bounds: {
        x: 1677,
        y: 835,
        width: 823,
        height: 851,
      },
      action: {
        type: 'uri',
        uri: 'https://www.instagram.com/weather_dressing/',
      },
    },
  ],
};

module.exports = richmenu;
