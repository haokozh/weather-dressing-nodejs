const dressStyleOne1040 = (req, res) => {
  res.sendFile('/app/public/assets/images/imagemap/dress-style-1040.png');
};

const dressStyleOne700 = (req, res) => {
  res.sendFile('/app/public/assets/images/imagemap/dress-style-700.png');
};

const dressStyleTwo1040 = (req, res) => {
  res.sendFile('/app/public/assets/images/imagemap/dress-style-1040-2.png');
};

const dressStyleTwo700 = (req, res) => {
  res.sendFile('/app/public/assets/images/imagemap/dress-style-700-2.png');
};

const nike = (req, res) => {
  res.sendFile('/app/public/assets/images/logo/nike-logo.jpg');
};

module.exports = {
  dressStyleOne1040,
  dressStyleOne700,
  dressStyleTwo1040,
  dressStyleTwo700,
  nike,
};
