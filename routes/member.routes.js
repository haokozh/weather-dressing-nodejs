const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer();

const passport = require('passport');

const memberController = require('../controllers/member.controller');

router.get('/', memberController.findAllMembers);

router.get('/register', memberController.register);

router.post('/register', upload.none(), memberController.newMember);

router.get('/login', memberController.renderLogin);

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/members/login',
  }),
  upload.none(),
  memberController.login
);

router.get('/:id', memberController.findMemberById);

module.exports = router;
