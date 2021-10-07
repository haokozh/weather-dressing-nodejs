const line = require('@line/bot-sdk');

const client = new line.Client({
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

module.exports = {
  client
};
