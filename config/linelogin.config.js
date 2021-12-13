const loginConfig = {
  channel_id: process.env.LINE_LOGIN_CHANNEL_ID,
  channel_secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
  callback_url: process.env.LINE_LOGIN_CALLBACK_URL,
  scope: 'profile openid',
  prompt: 'consent',
  bot_prompt: 'normal',
  ui_locales: 'zh-TW',
};

module.exports = loginConfig;
