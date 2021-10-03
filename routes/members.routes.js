const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer();

const memberController = require('../controllers/members.controllers');

router.get('/register', memberController.register);

router.post('/register', upload.array(), memberController.newMember);

module.exports = router;
