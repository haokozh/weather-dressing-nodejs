const index = (req, res) => {
  res.render('index', { title: '首頁' });
};

module.exports = {
  index,
};
