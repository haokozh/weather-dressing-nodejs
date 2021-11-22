const express = require('express');
const router = express.Router();

const imageController = require('../controllers/image.controller');

router.get('/dressStyle/one/1040', imageController.dressStyleOne1040);
router.get('/dressStyle/one/700', imageController.dressStyleOne700);

module.exports = router;