const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer({
  dest: '/upload'
});

const upload = multer({ storage: storage });

const router = express.Router();

const indexController = require('../controllers/index.controller');

router.get('/', indexController.index);
router.get('/about', indexController.about);
router.get('/upload', indexController.renderUploadImage);
router.post('/upload', upload.single('picture'), indexController.uploadImage);

module.exports = router;
