const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer();

const memberController = require('../controllers/members.controllers');

router.get('/register', (req, res) => {
  res.render('members/register');
});

router.post('/register', upload.array(), (req, res) => {
  try {
    console.log('Here is req.body:');
    console.log(JSON.stringify(req.body));

    memberController.newMember(
      req.body.password,
      req.body.account,
      req.body.confirmPassword,
      req.body.gender
    );

    res.status(200).send(req.body);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
