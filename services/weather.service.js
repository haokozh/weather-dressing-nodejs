const { get } = require('axios');
const qs = require('qs');

const ResponseData = require('../models/response-data.model');
const weatherElement = require('../models/weather-element.model');

const getTwoDaysLocationId = (locationsName) => {
  let prefixId = 'F-D0047-';
  switch (locationsName) {
    case '宜蘭縣':
      return (prefixId += '001');
    case '桃園市':
      return (prefixId += '005');
    case '新竹縣':
      return (prefixId += '009');
    case '苗栗縣':
      return (prefixId += '013');
    case '彰化縣':
      return (prefixId += '017');
    case '南投縣':
      return (prefixId += '021');
    case '雲林縣':
      return (prefixId += '025');
    case '嘉義縣':
      return (prefixId += '029');
    case '屏東縣':
      return (prefixId += '033');
    case '臺東縣':
      return (prefixId += '037');
    case '花蓮縣':
      return (prefixId += '041');
    case '澎湖縣':
      return (prefixId += '045');
    case '基隆市':
      return (prefixId += '049');
    case '新竹市':
      return (prefixId += '053');
    case '嘉義市':
      return (prefixId += '057');
    case '臺北市':
      return (prefixId += '061');
    case '高雄市':
      return (prefixId += '065');
    case '新北市':
      return (prefixId += '079');
    case '臺中市':
      return (prefixId += '073');
    case '臺南市':
      return (prefixId += '077');
    case '連江縣':
      return (prefixId += '081');
    case '金門縣':
      return (prefixId += '085');
    default:
      throw new Error(`找不到${locationsName}的 ForecastId`);
  }
};

const getWeeklyLocationId = (locationsName) => {
  let prefixId = 'F-D0047-';
  switch (locationsName) {
    case '宜蘭縣':
      return (prefixId += '003');
    case '桃園市':
      return (prefixId += '007');
    case '新竹縣':
      return (prefixId += '011');
    case '苗栗縣':
      return (prefixId += '015');
    case '彰化縣':
      return (prefixId += '019');
    case '南投縣':
      return (prefixId += '023');
    case '雲林縣':
      return (prefixId += '027');
    case '嘉義縣':
      return (prefixId += '031');
    case '屏東縣':
      return (prefixId += '035');
    case '臺東縣':
    case '台東縣':
      return (prefixId += '039');
    case '花蓮縣':
      return (prefixId += '043');
    case '澎湖縣':
      return (prefixId += '047');
    case '基隆市':
      return (prefixId += '051');
    case '新竹市':
      return (prefixId += '055');
    case '嘉義市':
      return (prefixId += '059');
    case '臺北市':
    case '台北市':
      return (prefixId += '063');
    case '高雄市':
      return (prefixId += '067');
    case '新北市':
      return (prefixId += '071');
    case '臺中市':
    case '台中市':
      return (prefixId += '075');
    case '臺南市':
    case '台南市':
      return (prefixId += '079');
    case '連江縣':
      return (prefixId += '083');
    case '金門縣':
      return (prefixId += '087');
    default:
      throw new Error(`找不到${locationsName}的 ForecastId`);
  }
};

const getDistsByLocationsName = (locationsName) => {
  switch (locationsName) {
    case '宜蘭縣':
      return [
        '頭城鎮',
        '礁溪鄉',
        '壯圍鄉',
        '員山鄉',
        '宜蘭市',
        '大同鄉',
        '五結鄉',
        '三星鄉',
        '羅東鎮',
        '冬山鄉',
        '南澳鄉',
        '蘇澳鎮',
      ];
    case '桃園市':
      return [
        '大園區',
        '蘆竹區',
        '觀音區',
        '龜山區',
        '桃園區',
        '中壢區',
        '新屋區',
        '八德區',
        '平鎮區',
        '楊梅區',
        '大溪區',
        '龍潭區',
        '復興區',
      ];
    case '新竹縣':
      return [
        '新豐鄉',
        '湖口鄉',
        '新埔鎮',
        '竹北市',
        '關西鎮',
        '芎林鄉',
        '竹東鎮',
        '寶山鄉',
        '尖石鄉',
        '橫山鄉',
        '北埔鄉',
        '峨眉鄉',
        '五峰鄉',
      ];
    case '苗栗縣':
      return [
        '竹南鎮',
        '頭份市',
        '三灣鄉',
        '造橋鄉',
        '後龍鎮',
        '南庄鄉',
        '頭屋鄉',
        '獅潭鄉',
        '苗栗市',
        '西湖鄉',
        '通霄鎮',
        '公館鄉',
        '銅鑼鄉',
        '泰安鄉',
        '苑裡鎮',
        '大湖鄉',
        '三義鄉',
        '卓蘭鎮',
      ];
    case '彰化縣':
      return [
        '伸港鄉',
        '和美鎮',
        '線西鄉',
        '鹿港鎮',
        '彰化市',
        '秀水鄉',
        '福興鄉',
        '花壇鄉',
        '芬園鄉',
        '芳苑鄉',
        '埔鹽鄉',
        '大村鄉',
        '二林鎮',
        '員林市',
        '溪湖鎮',
        '埔心鄉',
        '永靖鄉',
        '社頭鄉',
        '埤頭鄉',
        '田尾鄉',
        '大城鄉',
        '田中鎮',
        '北斗鎮',
        '竹塘鄉',
        '溪州鄉',
        '二水鄉',
      ];
    case '南投縣':
      return [
        '仁愛鄉',
        '國姓鄉',
        '埔里鎮',
        '草屯鎮',
        '中寮鄉',
        '南投市',
        '魚池鄉',
        '水里鄉',
        '名間鄉',
        '信義鄉',
        '集集鎮',
        '竹山鎮',
        '鹿谷鄉',
      ];
    case '雲林縣':
      return [
        '麥寮鄉',
        '二崙鄉',
        '崙背鄉',
        '西螺鎮',
        '莿桐鄉',
        '林內鄉',
        '臺西鄉',
        '土庫鎮',
        '虎尾鎮',
        '褒忠鄉',
        '東勢鄉',
        '斗南鎮',
        '四湖鄉',
        '古坑鄉',
        '元長鄉',
        '大埤鄉',
        '口湖鄉',
        '北港鎮',
        '水林鄉',
        '斗六市',
      ];
    case '嘉義縣':
      return [
        '大林鎮',
        '溪口鄉',
        '阿里山鄉',
        '梅山鄉',
        '新港鄉',
        '民雄鄉',
        '六腳鄉',
        '竹崎鄉',
        '東石鄉',
        '太保市',
        '番路鄉',
        '朴子市',
        '水上鄉',
        '中埔鄉',
        '布袋鎮',
        '鹿草鄉',
        '義竹鄉',
        '大埔鄉',
      ];
    case '屏東縣':
      return [
        '高樹鄉',
        '三地門鄉',
        '霧臺鄉',
        '里港鄉',
        '鹽埔鄉',
        '九如鄉',
        '長治鄉',
        '瑪家鄉',
        '屏東市',
        '內埔鄉',
        '麟洛鄉',
        '泰武鄉',
        '萬巒鄉',
        '竹田鄉',
        '萬丹鄉',
        '來義鄉',
        '潮州鎮',
        '新園鄉',
        '崁頂鄉',
        '新埤鄉',
        '南州鄉',
        '東港鎮',
        '林邊鄉',
        '佳冬鄉',
        '春日鄉',
        '獅子鄉',
        '琉球鄉',
        '枋山鄉',
        '牡丹鄉',
        '滿州鄉',
        '車城鄉',
        '恆春鎮',
        '枋寮鄉',
      ];
    case '臺東縣':
    case '台東縣':
      return [
        '長濱鄉',
        '海端鄉',
        '池上鄉',
        '成功鎮',
        '關山鎮',
        '東河鄉',
        '鹿野鄉',
        '延平鄉',
        '卑南鄉',
        '臺東市',
        '太麻里鄉',
        '綠島鄉',
        '達仁鄉',
        '大武鄉',
        '蘭嶼鄉',
        '金峰鄉',
      ];
    case '花蓮縣':
      return [
        '秀林鄉',
        '新城鄉',
        '花蓮市',
        '吉安鄉',
        '壽豐鄉',
        '萬榮鄉',
        '鳳林鎮',
        '豐濱鄉',
        '光復鄉',
        '卓溪鄉',
        '瑞穗鄉',
        '玉里鎮',
        '富里鄉',
      ];
    case '澎湖縣':
      return ['白沙鄉', '西嶼鄉', '湖西鄉', '馬公市', '望安鄉', '七美鄉'];
    case '基隆市':
      return [
        '安樂區',
        '中山區',
        '中正區',
        '七堵區',
        '信義區',
        '仁愛區',
        '暖暖區',
      ];
    case '新竹市':
      return ['北區', '香山區', '東區'];
    case '嘉義市':
      return ['東區', '西區'];
    case '臺北市':
    case '台北市':
      return [
        '北投區',
        '士林區',
        '內湖區',
        '中山區',
        '大同區',
        '松山區',
        '南港區',
        '中正區',
        '萬華區',
        '信義區',
        '大安區',
        '文山區',
      ];
    case '高雄市':
      return [
        '楠梓區',
        '左營區',
        '三民區',
        '鼓山區',
        '苓雅區',
        '新興區',
        '前金區',
        '鹽埕區',
        '前鎮區',
        '旗津區',
        '小港區',
        '那瑪夏區',
        '甲仙區',
        '六龜區',
        '杉林區',
        '內門區',
        '茂林區',
        '美濃區',
        '旗山區',
        '田寮區',
        '湖內區',
        '茄萣區',
        '阿蓮區',
        '路竹區',
        '永安區',
        '岡山區',
        '燕巢區',
        '彌陀區',
        '橋頭區',
        '大樹區',
        '梓官區',
        '大社區',
        '仁武區',
        '鳥松區',
        '大寮區',
        '鳳山區',
        '林園區',
        '桃源區',
      ];
    case '新北市':
      return [
        '石門區',
        '三芝區',
        '金山區',
        '淡水區',
        '萬里區',
        '八里區',
        '汐止區',
        '林口區',
        '五股區',
        '瑞芳區',
        '蘆洲區',
        '雙溪區',
        '三重區',
        '貢寮區',
        '平溪區',
        '泰山區',
        '新莊區',
        '石碇區',
        '板橋區',
        '深坑區',
        '永和區',
        '樹林區',
        '中和區',
        '土城區',
        '新店區',
        '坪林區',
        '鶯歌區',
        '三峽區',
        '烏來區',
      ];
    case '臺中市':
    case '台中市':
      return [
        '北屯區',
        '西屯區',
        '北區',
        '南屯區',
        '西區',
        '東區',
        '中區',
        '南區',
        '和平區',
        '大甲區',
        '大安區',
        '外埔區',
        '后里區',
        '清水區',
        '東勢區',
        '神岡區',
        '龍井區',
        '石岡區',
        '豐原區',
        '梧棲區',
        '新社區',
        '沙鹿區',
        '大雅區',
        '潭子區',
        '大肚區',
        '太平區',
        '烏日區',
        '大里區',
        '霧峰區',
      ];
    case '臺南市':
    case '台南市':
      return [
        '安南區',
        '中西區',
        '安平區',
        '東區',
        '南區',
        '北區',
        '白河區',
        '後壁區',
        '鹽水區',
        '新營區',
        '東山區',
        '北門區',
        '柳營區',
        '學甲區',
        '下營區',
        '六甲區',
        '南化區',
        '將軍區',
        '楠西區',
        '麻豆區',
        '官田區',
        '佳里區',
        '大內區',
        '七股區',
        '玉井區',
        '善化區',
        '西港區',
        '山上區',
        '安定區',
        '新市區',
        '左鎮區',
        '新化區',
        '永康區',
        '歸仁區',
        '關廟區',
        '龍崎區',
        '仁德區',
      ];
    case '連江縣':
      return ['南竿鄉', '北竿鄉', '莒光鄉', '東引鄉'];
    case '金門縣':
      return ['金城鎮', '金湖鎮', '金沙鎮', '金寧鄉', '烈嶼鄉', '烏坵鄉'];
    default:
      throw new Error(`找不到${locationsName}的行政區`);
  }
};

const getTargetDistByLocationsName = (targetDist, locationsName) => {
  const dists = getDistsByLocationsName(locationsName);

  return dists.includes(targetDist) ? targetDist : `找不到${targetDist}`;
};

const getWeatherResponse = async (locationId, locationName, elementName) => {
  try {
    const { data } = await get(process.env.CWB_BASE_URL, {
      params: {
        Authorization: process.env.CWB_API_KEY,
        locationId: locationId,
        locationName: locationName,
        elementName: elementName,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    });

    return data;
  } catch (error) {
    console.error(
      `Error on linebot.service.getWeatherResponse(): ${error.stack}`
    );
  }
};

const getPoP12hDescription = (value) => {
  return `${value}%`;
};

const getTempDescription = (minTValue, maxTValue) => {
  return `${minTValue}°C ~ ${maxTValue}°C`;
};

const getConfortDescription = (minCIValue, maxCIValue) => {
  return minCIValue === maxCIValue
    ? `${minCIValue}`
    : `${minCIValue}至${maxCIValue}`;
};

const parseResponseToFlexBubble = (data) => {
  try {
    const responseData = new ResponseData(data.records);
    const locationIndex = 0;
    const timeIndex = 0;
    const elementValueIndex = 0;
    const confortValueIndex = 1;

    const pop12hTime = responseData.getTime(
      locationIndex,
      weatherElement.POP_12H,
      timeIndex
    );
    const pop12h = responseData.getElementValue(
      locationIndex,
      weatherElement.POP_12H,
      timeIndex,
      elementValueIndex
    );

    const weatherDescription = responseData.getElementValue(
      locationIndex,
      weatherElement.WEATHER_DESCRIPTION,
      timeIndex,
      elementValueIndex
    );

    const minT = responseData.getElementValue(
      locationIndex,
      weatherElement.MIN_T,
      timeIndex,
      elementValueIndex
    );
    const maxT = responseData.getElementValue(
      locationIndex,
      weatherElement.MAX_T,
      timeIndex,
      elementValueIndex
    );

    const minCI = responseData.getElementValue(
      locationIndex,
      weatherElement.MIN_CI,
      timeIndex,
      confortValueIndex
    );
    const maxCI = responseData.getElementValue(
      locationIndex,
      weatherElement.MAX_CI,
      timeIndex,
      confortValueIndex
    );

    return replyFlexBubble(
      responseData.locationsName,
      responseData.locationName,
      pop12hTime,
      getPoP12hDescription(pop12h.value),
      weatherDescription,
      getTempDescription(minT.value, maxT.value),
      getConfortDescription(minCI.value, maxCI.value)
    );
  } catch (error) {
    console.error(
      `Error on linebot.service.parseResponseToFlexBubble(): ${error.stack}`
    );
  }
};

const replyFlexBubble = (
  locationsName,
  locationName,
  pop12hTime,
  pop12hDescription,
  weatherDescription,
  tempDescription,
  confortDescription
) => {
  return (replyBubble = {
    type: 'flex',
    altText: 'This is FlexMessage',
    contents: {
      type: 'bubble',
      hero: {
        type: 'image',
        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip4.jpg',
        size: 'full',
        aspectRatio: '20:13',
        aspectMode: 'cover',
        action: {
          type: 'uri',
          uri: 'http://linecorp.com/',
        },
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: `${locationsName} ${locationName}`,
            weight: 'bold',
            size: 'xl',
            align: 'center',
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'md',
            contents: [
              {
                type: 'text',
                text: `${pop12hTime.startTime} ~ ${pop12hTime.endTime}`,
                size: 'md',
                color: '#999999',
                margin: 'md',
                flex: 0,
                align: 'center',
                weight: 'regular',
              },
              {
                type: 'separator',
              },
            ],
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            spacing: 'sm',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '天氣狀況',
                    color: '#0099FF',
                    weight: 'bold',
                    size: 'md',
                    offsetEnd: 'none',
                  },
                  {
                    type: 'text',
                    text: weatherDescription.value,
                    weight: 'bold',
                    size: 'md',
                    offsetEnd: '50px',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '溫度狀況',
                    size: 'md',
                    color: '#0099FF',
                    weight: 'bold',
                  },
                  {
                    type: 'text',
                    text: tempDescription,
                    offsetEnd: '50px',
                    weight: 'bold',
                    size: 'md',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '降雨機率',
                    color: '#0099FF',
                    weight: 'bold',
                    size: 'md',
                  },
                  {
                    type: 'text',
                    text: pop12hDescription,
                    offsetEnd: '50px',
                    weight: 'bold',
                    size: 'md',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '舒適度',
                    size: 'md',
                    color: '#0099FF',
                    weight: 'bold',
                  },
                  {
                    type: 'text',
                    text: confortDescription,
                    offsetEnd: '50px',
                    size: 'md',
                    weight: 'bold',
                  },
                ],
              },
              {
                type: 'separator',
              },
            ],
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'button',
            style: 'link',
            height: 'sm',
            action: {
              type: 'uri',
              label: '詳細內容',
              uri: 'https://www.cwb.gov.tw/V8/C/W/County/index.html',
            },
          },
          {
            type: 'spacer',
            size: 'sm',
          },
        ],
        flex: 0,
      },
    },
  });
};

module.exports = {
  getWeeklyLocationId,
  getTargetDistByLocationsName,
  getWeatherResponse,
  parseResponseToFlexBubble,
  findWeeklyForecastIdByCityName,
};
