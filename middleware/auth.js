const auth = (req, res, next) => {
  if (req.session.user || req.session.authPass) {
    console.log('authenticated');
    next();
  } else {
    console.log('not authenticated');
    return res.redirect('/members/login');
  }

  next();
};

module.exports = auth;
