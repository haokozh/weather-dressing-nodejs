const indexService = require('../services/index.service');

const index = (req, res) => {
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

const sendDressListData = async (req, res) => {
  try {
    const member = await indexService.findMemberByAccount(req.session.user);

    if (member) {
      let record = [];
      record.push(member.id);
      record.push(req.body.age);
      record.push(req.body.gender);

      const variety = req.body.variety;
      variety.forEach((v) => record.push(v));

      console.log(record);

      indexService.insertDressListData(record);
    }

    res.redirect('/dressstore');
  } catch (error) {
    console.error(`Error on sendDressListData(): ${error}`);
  }
};

const renderUploadImage = (req, res) => {
  res.render('upload', { title: '上傳照片' });
};

const uploadImage = (req, res) => {
  console.log(req.file, req.body);
  console.log(req.body.temperature);
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
