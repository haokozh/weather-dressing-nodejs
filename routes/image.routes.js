const express = require('express');
const router = express.Router();

router.get('/dressStyle/one/1040', imageController.dressStyleOne);

module.exports = router;