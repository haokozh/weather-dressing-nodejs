const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const router = express.Router();
const s3 = new aws.S3();

const storage = multerS3({
  s3: s3,
  bucket: 'weather-dressing-assets',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
  metadata: (req, file, cb) => {
    cb(null, {
      fieldName: file.fieldname,
      uploadBy: 'guest',
      temperature: req.body.temperature,
      location: req.body.location,
    });
  },
  key: (req, file, cb) => {
    cb(
      null,
      `guest_${req.body.temperature}_${
        req.body.location
      }_${new Date().toISOString()}`
    );
  },
});

const upload = multer({ storage: storage, limits: 12 * 1024 * 1024 });

const indexController = require('../controllers/index.controller');
const auth = require('../middleware/auth');

router.get('/', indexController.index);
router.get('/about', indexController.about);
router.get('/dresslist', auth, indexController.dresslist);
router.post('/dresslist', indexController.sendDressListData);
router.get('/dressstore', indexController.dressstore);
router.get('/upload', indexController.renderUploadImage);
router.post(
  '/upload',
  upload.single('picture'),
  indexController.uploadImage
);

module.exports = router;
