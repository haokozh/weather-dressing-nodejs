const suggestion = (req, res) => {
  res.render('suggestion/suggestion', { title: '穿搭建議' });
};

module.exports = {
  suggestion,
};