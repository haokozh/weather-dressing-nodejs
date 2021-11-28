const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const app = express();

// view engine
app.set('views', 'views');
app.set('view engine', 'ejs');

// line callback
app.use('/callback', require('./routes/linebot.routes'));

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    },
  })
);

// use static file
app.use(express.static('public'));

// web routes
app.use('/', require('./routes/index.routes'));
app.use('/members', require('./routes/member.routes'));
app.use('/weather', require('./routes/suggest.routes'));
app.use('/image', require('./routes/image.routes'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
