const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer();

router.get('/register', (req, res) => {
    res.render('members/register');
});

router.post('/register', upload.array(), (req, res) => {
    console.log(req.body);
    res.status(200).send(req.body);
});

module.exports = router;