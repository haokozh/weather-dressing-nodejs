const express = require('express');
const router = express.Router();

const imageController = require('../controllers/image.controller');

router.get('/dressStyle/one/1040', imageController.dressStyleOne1040);
router.get('/dressStyle/one/700', imageController.dressStyleOne700);
router.get('/dressStyle/two/1040', imageController.dressStyleTwo1040);
router.get('/dressStyle/two/700', imageController.dressStyleTwo700);
router.get('/carousel/nike', imageController.nike);

module.exports = router;