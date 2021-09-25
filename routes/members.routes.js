const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('members/register');
});

module.exports = router;