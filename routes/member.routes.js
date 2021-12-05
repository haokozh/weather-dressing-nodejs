const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer();

const memberController = require('../controllers/member.controller');
const passport = require('../config/passport.config');

router.get('/', memberController.findAllMembers);

router.get('/register', memberController.register);

router.post('/register', upload.none(), memberController.newMember);

router.get('/login', memberController.renderLogin);

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
  }),
  upload.none(),
  memberController.login
);

router.get('/:id', memberController.findMemberById);

module.exports = router;
