const { join } = require('path');
const { readFileSync } = require('fs');
const { client } = require('../config/linebot.config');

const richmenu = require('../models/richmenu.model');
const eventService = require('../services/event.service');

const isWebhookTest = (replyToken) => {
  return (
    replyToken === '00000000000000000000000000000000' ||
    replyToken === 'ffffffffffffffffffffffffffffffff'
  );
};

const handleEvent = (event) => {
  try {
    if (isWebhookTest(event.replyToken)) return Promise.resolve(null);

    return handleWebhookEvent(event);
  } catch (error) {
    console.error(`Error on linebot.controller.handleEvent() ${error}`);
  }
};

const handleWebhookEvent = (event) => {
  return eventService.handleWebhookEvent(event);
};

const createRichMenu = async (client) => {
  const richMenuId = await client.createRichMenu(richmenu);
  const filePath = join(__dirname, './public/assets/images/richmenu.png');
  const buffer = readFileSync(filePath);

  await client.setRichMenuImage(richMenuId, buffer);

  await client.setDefaultRichMenu(richMenuId);
};

createRichMenu(client);

module.exports = {
  isWebhookTest,
  handleEvent,
};
