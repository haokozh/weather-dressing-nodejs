const getDistsByLocationsName = require('../lib/getDistsByLocationsName');

function isWebhookTest(replyToken) {
  return (
    replyToken === '00000000000000000000000000000000' ||
    replyToken === 'ffffffffffffffffffffffffffffffff'
  );
}

function getTargetDistByLocationsName(targetDist, locationsName) {
  const dists = getDistsByLocationsName(locationsName);

  return dists.includes(targetDist) ? targetDist : `找不到${targetDist}`;
}

module.exports = {
  isWebhookTest,
  getTargetDistByLocationsName,
};
