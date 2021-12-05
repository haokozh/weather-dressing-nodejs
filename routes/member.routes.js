const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer();

const memberController = require('../controllers/member.controller');

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
};

const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
};

router.get('/', memberController.findAllMembers);

router.get('/register', memberController.register);

router.post('/register', checkNotAuthenticated, upload.none(), memberController.newMember);

router.get('/login', memberController.renderLogin);

router.post('/login', checkNotAuthenticated, upload.none(), memberController.login);

router.get('/:id', memberController.findMemberById);

module.exports = router;
