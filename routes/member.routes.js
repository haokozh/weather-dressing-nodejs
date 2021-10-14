const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer();

const memberController = require('../controllers/member.controller');

router.get('/', memberController.findAllMembers);

router.get('/register', memberController.register);

router.post('/register', upload.array(), memberController.newMember);

router.get('/:id', memberController.findMemberById);

module.exports = router;
