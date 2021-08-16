function get48HoursLocationId(locationsName) {
  const prefixId = 'F-D0047-';
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
}

module.exports = get48HoursLocationId;