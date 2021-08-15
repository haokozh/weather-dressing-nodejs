const getDistsByLocationsName = require('./getDistsByLocationsName');

function getTargetDistByLocationsName(targetDist, locationsName) {
  const dists = getDistsByLocationsName(locationsName);

  return dists.includes(targetDist) ? targetDist : `找不到${targetDist}`;
}

module.exports = getTargetDistByLocationsName;