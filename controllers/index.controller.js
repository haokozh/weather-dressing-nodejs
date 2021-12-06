const index = (req, res) => {
  console.log(req.session);
  console.log(req.sessionID);
  res.render('index', { title: '首頁' });
};

const about = (req, res) => {
  res.render('about', { title: '關於我們' });
};

const dressstore = (req, res) => {
  res.render('dressstore', { title: '店家推薦' });
};

const dresslist = (req, res) => {
  res.render('dresslist', { title: '推薦店家' });
};

const sendDressListData = (req, res) => {
  console.log(req.body.age);
  console.log(req.body.gender);
  console.log(req.body.variety[0]);
  console.log(req.body.variety[1]);
  console.log(req.body.variety[2]);
  res.send(req.body);
};

const renderUploadImage = (req, res) => {
  res.render('upload', { title: '上傳照片' });
};

const uploadImage = (req, res) => {
  console.log(req.file, req.body);
  console.log(req.body.temprature);
  console.log(req.body.location);

  res.send('image uploaded');
};

module.exports = {
  index,
  about,
  renderUploadImage,
  uploadImage,
  dressstore,
  dresslist,
  sendDressListData,
};
