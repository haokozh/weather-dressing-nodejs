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

    console.log(city, dist, purpose);

    const renderData = await suggestionService.getResponse(city, dist);

    const currentTime = new Date(Date.now());
    let suggestionImageName = '';
    let angelImageName = '';
    let realImageName = '10-1';
    const IMAGE_BASE_URL = 'https://weather-dressing/image';

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
      case 'travel':
        suggestionImageName += '1_';
        break;
      case 'school':
        suggestionImageName += '2_';
        break;
      case 'work':
        suggestionImageName += '3_';
        break;
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
      angel: `${IMAGE_BASE_URL}/angel/1`,
      real: `${IMAGE_BASE_URL}/real/10-1`,
      suggestionDotJpg: `${IMAGE_BASE_URL}/suggestion/pm_d_1_20.jpg`,
      suggestionDotPng: `${IMAGE_BASE_URL}/suggestion/pm_d_1_20.png`,
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
