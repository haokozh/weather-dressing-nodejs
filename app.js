const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const passport = require('passport');
const morgan = require('morgan');

const pool = require('./config/db.config');
const { lineStrategy, localStrategy } = require('./config/passport.config');

const app = express();

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

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(morgan('tiny'));

// line callback
app.use('/callback', require('./routes/linebot.routes'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    store: new pgSession({
      pool: pool,
      createTableIfMissing: true,
    }),
    secret: crypto.randomBytes(128).toString('hex'),
    name: 'user',
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 600 * 1000,
      secure: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use('line', lineStrategy);
passport.use('local', localStrategy);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.use(express.static('public'));

app.use('/', require('./routes/index.routes'));
app.use('/members', require('./routes/member.routes'));
app.use('/weather', require('./routes/suggest.routes'));
app.use('/image', require('./routes/image.routes'));

app.get(
  '/login/line/return',
  passport.authenticate('line', {
    successRedirect: '/',
    failureRedirect: '/members/login',
  }),
  (req, res) => {
    res.send('logged in');
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
