const express = require('express');
const router = express.Router();

const suggestionController = require('../controllers/suggestion.controller');

router.get('/suggsetion', suggestionController.suggestion);
router.get('/select', suggestionController.select);

module.exports = router;
