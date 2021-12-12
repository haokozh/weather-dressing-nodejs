const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const suggestController = require('../controllers/suggest.controller');

router.get('/suggestion', suggestController.suggestion);
router.post('/suggestion', upload.none(), suggestController.sendSuggestion);
router.post('/favorite', auth, suggestController.saveFavorite);
router.get('/final', suggestController.final);

module.exports = router;
