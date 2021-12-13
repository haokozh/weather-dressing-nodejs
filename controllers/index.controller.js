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
      let checkBox = Array(12).fill(false);

      for (let i = 0; i < req.body.variety.length; i++) {
        if (req.body.variety[i]) {
          checkBox[i] = true;
        }
      }

      indexService.insertDressListData(
        member.id,
        req.body.age,
        req.body.gender,
        ...checkBox
      );
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

  res.render('upload-success', { title: 上傳成功 });
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
