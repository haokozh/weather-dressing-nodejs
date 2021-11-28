const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const passport = require('passport');
const LineStrategy = require('passport-line-auth').Strategy;
const morgan = require('morgan');

const app = express();

// view engine
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(morgan('tiny'));

// line callback
app.use('/callback', require('./routes/linebot.routes'));

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookie-parser
app.use(cookieParser());

// session
app.use(
  session({
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

// passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LineStrategy(
    {
      channelID: '1656649772',
      channelSecret: 'd547d76ee368206d67fd9cc04af168e8',
      callbackURL: 'https://weather-dressing.herokuapp.com/login/line/return',
      scope: ['profile', 'openid'],
      botPrompt: 'normal',
      uiLocales: 'zh_TW',
    },
    (accessToken, refreshToken, params, profile, cb) => {
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// use static file
app.use(express.static('public'));

// web routes
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
    res.redirect('/');
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
