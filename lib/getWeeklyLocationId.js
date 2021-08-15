function getWeeklyLocationId(locationsName) {
  const prefixId = 'F-D0047-';
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
      return (prefixId += '063');
    case '高雄市':
      return (prefixId += '067');
    case '新北市':
      return (prefixId += '071');
    case '臺中市':
      return (prefixId += '075');
    case '臺南市':
      return (prefixId += '079');
    case '連江縣':
      return (prefixId += '083');
    case '金門縣':
      return (prefixId += '087');
    default:
      throw new Error(`找不到${locationsName}的 ForecastId`);
  }
}

module.exports = getWeeklyLocationId;
