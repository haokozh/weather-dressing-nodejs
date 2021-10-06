const line = require('@line/bot-sdk');

const client = new line.Client({
  channelSecret: linebotConfig.channelSecret,
  channelAccessToken: linebotConfig.channelAccessToken,
});

module.exports = {
  client
};
