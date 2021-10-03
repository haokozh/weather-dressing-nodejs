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
    console.log(req.body);

    const member = req.body;

    memberController.newMember(
      member.account,
      member.password,
      member.confirmPassword,
      member.gender
    );

    memberController.newMember(member);

    res.status(200).send(req.body);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
