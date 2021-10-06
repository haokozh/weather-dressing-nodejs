const line = require('@line/bot-sdk');

const client = new line.Client({
  channelSecret: process.env.channelSecret,
  channelAccessToken: process.env.channelAccessToken,
});

module.exports = {
  client
};
