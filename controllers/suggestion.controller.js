const suggestion = (req, res) => {
  res.render('../views/suggestion/suggestion', { title: '穿搭建議' });
};

module.exports = {
  suggestion,
};
