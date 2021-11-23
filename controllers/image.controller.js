const IMAGE_BASE_URL = '/app/public/assets/images';

const dressStyleOne1040 = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/imagemap/dress-style-1040.png`);
};

const dressStyleOne700 = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/imagemap/dress-style-700.png`);
};

const dressStyleTwo1040 = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/imagemap/dress-style-1040-2.png`);
};

const dressStyleTwo700 = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/imagemap/dress-style-700-2.png`);
};

const nike = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/logo/nike-logo.jpg`);
};

const adidas = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/logo/adidas-logo.jpg`);
};

const girls66 = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/66-girls-logo.jpg`);
};

const aes = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/logo/aes-logo.jpg`);
};

const anowherman = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/logo/anowherman-logo.jpg`);
};

const beams = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/logo/beams-logo.png`);
};
const bershka = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/logo/bershka-logo.png`);
};
const burberry = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/logo/burberry-logo.png`);
};
const celine = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/logo/celine-logo.png`);
};

module.exports = {
  dressStyleOne1040,
  dressStyleOne700,
  dressStyleTwo1040,
  dressStyleTwo700,
  nike,
  adidas,
  girls66,
  aes,
  anowherman,
  beams,
  bershka,
  burberry,
  celine,
};
