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
        y: 4,
        width: 1672,
        height: 823,
      },
      action: {
        type: 'message',
        text: '天氣查詢',
      },
    },
    {
      bounds: {
        x: 1673,
        y: 0,
        width: 827,
        height: 832,
      },
      action: {
        type: 'message',
        text: '穿搭建議',
      },
    },
    {
      bounds: {
        x: 0,
        y: 828,
        width: 857,
        height: 858,
      },
      action: {
        type: 'message',
        text: '品牌推薦',
      },
    },
    {
      bounds: {
        x: 853,
        y: 832,
        width: 824,
        height: 854,
      },
      action: {
        type: 'uri',
        uri: 'https://weather-dressing.herokuapp.com',
      },
    },
    {
      bounds: {
        x: 1672,
        y: 828,
        width: 828,
        height: 858,
      },
      action: {
        type: 'uri',
        uri: 'https://www.instagram.com/weather_dressing/',
      },
    },
  ],
};

module.exports = richmenu;