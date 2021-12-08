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
      uploadBy: req.session.user,
      temperature: req.body.temperature,
      location: req.body.location,
    });
  },
  key: (req, file, cb) => {
    cb(
      null,
      `${req.session.user}_${req.body.temperature}_${
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
router.get('/dresslist', indexController.dresslist);
router.post('/dresslist', indexController.sendDressListData);
router.get('/dressstore', indexController.dressstore);
router.get('/upload', auth, indexController.renderUploadImage);
router.post(
  '/upload',
  upload.single('picture'),
  auth,
  indexController.uploadImage
);

module.exports = router;
