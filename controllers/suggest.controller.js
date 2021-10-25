const suggest = (req, res) => {
  res.render('suggest/suggest', { title: '穿搭建議' });
};

module.exports = {
  suggest,
};
