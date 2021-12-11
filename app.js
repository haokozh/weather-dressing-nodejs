const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const crypto = require('crypto');
const morgan = require('morgan');

const pool = require('./config/db.config');

const app = express();

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(morgan('tiny'));

app.set('trust proxy', 1);
app.use(
  session({
    name: 'user',
    store: new pgSession({
      pool: pool,
      createTableIfMissing: true,
    }),
    secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 600 * 1000,
      secure: true,
    },
  })
);

// line callback
app.use('/callback', require('./routes/linebot.routes'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use('/', require('./routes/index.routes'));
app.use('/members', require('./routes/member.routes'));
app.use('/weather', require('./routes/suggest.routes'));
app.use('/image', require('./routes/image.routes'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
