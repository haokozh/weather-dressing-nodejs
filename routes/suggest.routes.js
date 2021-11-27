const express = require('express');
const router = express.Router();

const suggestController = require('../controllers/suggest.controller');

router.get('/suggestion', suggestController.suggestion);
router.get('/final', suggestController.final);

module.exports = router;
