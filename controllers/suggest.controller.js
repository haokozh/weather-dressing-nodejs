const suggestionService = require('../services/suggest.service');

const suggestion = (req, res) => {
  res.render('weather/suggestion', { title: '穿搭建議' });
};

const final = (req, res) => {
  res.render('weather/final', { title: '建議結果' });
};

const sendSuggestion = async (req, res) => {
  try {
    const { city, dist, purpose } = req.body;

    console.log(req.body);

    const renderData = await suggestionService.getResponse(city, dist);

    const currentTime = new Date(Date.now());
    let suggestionImageName = '';
    let angelImageName = '';
    let realImageName = '';
    const IMAGE_BASE_URL = 'https://weather-dressing.herokuapp.com/image';

    if (currentTime.getHours() >= 17) {
      suggestionImageName += 'pm_d_';
    } else {
      suggestionImageName += 'am_';

      if (Number(renderData.pop) >= 30) {
        suggestionImageName += 'r_';
      } else {
        suggestionImageName += 's_';
      }
    }

    switch (purpose) {
      case '出遊':
        suggestionImageName += '1_';
        break;
      case '學校':
        suggestionImageName += '2_';
        break;
      case '公司':
        suggestionImageName += '3_';
        break;
      default:
        throw new Error(`Unknown purpose ${purpose}`);
    }

    const avgT = (Number(renderData.minT) + Number(renderData.maxT)) / 2;
    if (avgT > 25) {
      suggestionImageName += '25';
    } else if (avgT >= 21) {
      suggestionImageName += '21';
    } else {
      suggestionImageName += '20';
    }

    if (avgT <= 15) {
      angelImageName = '1';
    } else if (avgT <= 20 && avgT >= 16) {
      angelImageName = '2';
    } else if (avgT <= 23 && avgT >= 21) {
      angelImageName = '3';
    } else if (avgT <= 26 && avgT >= 24) {
      angelImageName = '4';
    } else {
      angelImageName = '5';
    }

    if (renderData.pop >= 30) {
      angelImageName = '6';
    }

    const random = Math.floor(Math.random() * 13);
    const temp = [10, 14, 15, 18, 19, 20, 22, 23, 25, 26, 32, 33, 40];
    realImageName = `${temp[random]}`;

    res.render('weather/final', {
      title: '查詢結果',
      city: city,
      dist: dist,
      purpose: purpose,
      tempDesc: renderData.tempDesc,
      popDesc: renderData.popDesc,
      time: renderData.time,
      confortDesc: renderData.confortDesc,
      wd: renderData.wd,
      angel: `${IMAGE_BASE_URL}/angel/${angelImageName}`,
      real: `${IMAGE_BASE_URL}/real/${realImageName}-1`,
      suggestionDotJpg: `${IMAGE_BASE_URL}/suggestion/${suggestionImageName}.jpg`,
      suggestionDotPng: `${IMAGE_BASE_URL}/suggestion/${suggestionImageName}.png`,
    });
  } catch (error) {
    console.error(`Error on suggest.controller.sendSuggestion(): ${error}`);
  }
};

module.exports = {
  suggestion,
  final,
  sendSuggestion,
};
