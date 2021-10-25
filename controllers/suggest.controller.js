const suggestion = (req, res) => {
  res.render('weather/suggestion', { title: '穿搭建議' });
};

module.exports = {
  suggestion,
};
