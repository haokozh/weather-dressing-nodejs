const suggestion = (req, res) => {
  res.render('/suggestion', { title: '建議結果' });
};

const select = (req, res) => {
  res.render('/select', { title: '穿搭建議' });
};

module.exports = {
  suggestion,
  select
};
