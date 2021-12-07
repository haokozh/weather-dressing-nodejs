const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const router = express.Router();
const s3 = new aws.S3();

const storage = multerS3({
  s3: s3,
  bucket: 'weather-dressing-assets',
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    cb(null, Date.now().toString());
  },
});

const upload = multer({ storage: storage });

const indexController = require('../controllers/index.controller');

router.get('/', indexController.index);
router.get('/about', indexController.about);
router.get('/dresslist', indexController.dresslist);
router.post('/dresslist', indexController.sendDressListData);
router.get('/dressstore', indexController.dressstore);
router.get('/upload', auth, indexController.renderUploadImage);
router.post('/upload', auth, upload.single('picture'), indexController.uploadImage);

module.exports = router;
