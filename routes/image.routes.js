const express = require('express');
const router = express.Router();

const imageController = require('../controllers/image.controller');

router.get('/dressStyle/one/1040', imageController.dressStyleOne1040);
router.get('/dressStyle/one/700', imageController.dressStyleOne700);
router.get('/dressStyle/two/1040', imageController.dressStyleTwo1040);
router.get('/dressStyle/two/700', imageController.dressStyleTwo700);

router.get('/carousel/nike', imageController.nike);
router.get('/carousel/adidas', imageController.adidas);
router.get('/carousel/66girls', imageController.girls66);
router.get('/carousel/aes', imageController.aes);
router.get('/carousel/anowherman', imageController.anowherman);
router.get('/carousel/beams', imageController.beams);
router.get('/carousel/bershka', imageController.bershka);
router.get('/carousel/burberry', imageController.burberry);
router.get('/carousel/celine', imageController.celine);


module.exports = router;