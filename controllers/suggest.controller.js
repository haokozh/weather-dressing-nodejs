const suggestion = (req, res) => {
  res.render('weather/suggestion', { title: '穿搭建議' });
};

const final = (req, res) => {
  res.render('weather/final', { title: '建議結果' });
};

module.exports = {
  suggestion,
  final,
};
