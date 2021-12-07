const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer();

const memberController = require('../controllers/member.controller');
const auth = require('../middleware/auth');

router.get('/', auth, memberController.findAllMembers);

router.get('/register', memberController.register);

router.post('/register', upload.none(), memberController.newMember);

router.get('/login', memberController.renderLogin);

router.post('/login', upload.none(), memberController.login);

router.get('/:id', auth, memberController.findMemberById);

router.get('/logout', auth, memberController.logout);

module.exports = router;
