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
router.get('/carousel/champion', imageController.champion);
router.get('/carousel/chanel', imageController.chanel);
router.get('/carousel/chuu', imageController.chuu);
router.get('/carousel/clubmonaco', imageController.clubmonaco);
router.get('/carousel/coach', imageController.coach);
router.get('/carousel/coen', imageController.coen);
router.get('/carousel/converse', imageController.converse);
router.get('/carousel/darkvictory', imageController.darkvictory);
router.get('/carousel/dior', imageController.dior);
module.exports = router;
