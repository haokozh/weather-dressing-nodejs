const express = require('express');
const router = express.Router();

const suggestController = require('../controllers/suggest.controller');

router.get('/', suggestController.suggest);

module.exports = router;