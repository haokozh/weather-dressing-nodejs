// const line = require('@line/bot-sdk');
const express = require('express');

// const getWeatherResponse = require('./lib/getWeatherResponse');
// const get48HoursLocationId = require('./lib/get48HoursLocationId');
// const getWeeklyLocationId = require('./lib/getWeeklyLocationId');
// const getTargetDistByLocationsName = require('./lib/getTargetDistByLocationsName');

// const isWebhookTest = require('./lib/isWebhookTest');
// const linebotConfig = require('./config/linebot');

const app = express();

// const client = new line.Client({
//   channelSecret: linebotConfig.channelSecret,
//   channelAccessToken: linebotConfig.channelAccessToken,
// });

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

// app.post('/callback', line.middleware(client.config), (req, res) => {
//   Promise.all(req.body.events.map(handleEvent))
//     .then((result) => res.json(result))
//     .catch((err) => {
//       console.error(err);
//       res.status(500).end();
//     });
// });

// line bot routes
app.use('/callback', require('./routes/linebot.routes'));

// index routes
app.use('/', require('./routes/index.routes'));

// member routes
app.use('/members', require('./routes/members.routes'));

// async function handleEvent(event) {
//   if (isWebhookTest(event.replyToken)) return Promise.resolve(null);

//   const elementName = ['MinT', 'MaxT', 'PoP12h', 'Wx', 'MinCI', 'MaxCI'];

//   const originalText = event.message.text;
//   const splitedText = originalText.split(' ');

//   let locationId = getWeeklyLocationId(splitedText[0]);
//   let locationName = getTargetDistByLocationsName(
//     splitedText[1],
//     splitedText[0]
//   );

//   replyMessage = await getWeatherResponse(
//     locationId,
//     locationName,
//     elementName
//   );

//   return client.replyMessage(event.replyToken, replyMessage);
// }

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
