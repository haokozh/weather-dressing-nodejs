const express = require('express');
const app = express();

// view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use static file
app.use(express.static('public'));

app.use('/callback', require('./routes/linebot.routes'));
app.use('/', require('./routes/index.routes'));
app.use('/members', require('./routes/members.routes'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
