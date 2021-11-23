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
  res.sendFile(`${IMAGE_BASE_URL}/logo/bershka-logo.jpg`);
};
const burberry = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/logo/burberry-logo.jpg`);
};
const celine = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/logo/celine-logo.jpg`);
};

const champion = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/logo/champion-logo.jpg`);
};
const chanel = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/logo/chanel-logo.jpg`);
};
const chuu = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/logo/chuu-logo.jpg`);
};
const clubmonaco = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/logo/clubmonaco-logo.png`);
};

const coach = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/logo/coach-logo.jpg`);
};

const coen = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/logo/coen-logo.jpg`);
};

const converse = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/logo/converse-logo.jpg`);
};

const darkvictory = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/logo/darkvictory-logo.png`);
};

const dior = (req, res) => {
  res.sendFile(`${IMAGE_BASE_URL}/logo/dior-logo.jpg`);
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
  champion,
  chanel,
  chuu,
  clubmonaco,
  coach,
  coen,
  converse,
  darkvictory,
  dior,
};
