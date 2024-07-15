const path = require("path");

const projectMainFolder = path.join(
  __dirname.substr(0, __dirname.lastIndexOf("\\"))
);

const Index = (req, res) => {
  res.sendFile(projectMainFolder + "/html/index.html");
};

const arac = (req, res) => {
  const parametre = req.params;
  console.log(parametre.markaAdi);
  console.log(parametre.sehirAdi);
  const query = req.query;
  console.log(query);
  console.log(query.min);
  console.log(query.max);
  res.sendFile(projectMainFolder + "/html/arac.html");
  // res.json({ parametre: req.params.markaAdi });
};

module.exports = { arac, Index };
