const index = (req, res) => {
  res.render('index', { title: '首頁' });
};

const about = (req, res) => {
  res.render('about', { title: '關於我們' });
};

const renderUploadImage = (req, res) => {
  res.render('upload', { title: '上傳照片' });
};

const uploadImage = (req, res) => {
  console.log(req.file, req.body);

  res.send('image uploaded');
};

module.exports = {
  index,
  about,
  renderUploadImage,
  uploadImage
};
