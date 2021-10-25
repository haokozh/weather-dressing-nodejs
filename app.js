const express = require('express');
const app = express();

// view engine
app.set('views', 'views');
app.set('view engine', 'ejs');

// line callback
app.use('/callback', require('./routes/linebot.routes'));

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use static file
app.use(express.static('public'));

// web routes
app.use('/', require('./routes/index.routes'));
app.use('/members', require('./routes/member.routes'));
app.use('/suggest', require('./routes/suggest.routes'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
