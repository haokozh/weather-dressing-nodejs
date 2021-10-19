const express = require('express');
const router = express.Router();

const suggestionController = require('../controllers/suggestion.controller');

router.get('/', suggestionController.suggestion);

module.exports = router;