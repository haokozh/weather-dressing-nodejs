const express = require('express');
const router = express.Router();

const suggestionController = require('../controllers/suggestion.controller');

router.get('/', suggestionController.suggestion);
router.get('/select', suggestionController.select);

module.exports = router;
