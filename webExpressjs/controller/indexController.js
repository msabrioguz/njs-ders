const path = require("path");

const projectMainFolder = path.join(
  __dirname.substr(0, __dirname.lastIndexOf("\\"))
);

const Index = (req, res) => {
  res.render("index", {
    title: "Anasayfa",
    dizi: [1,2,3,4,5,6,7,8,9]
  });
};

const arac = (req, res) => {
  const parametre = req.params;
  console.log(parametre.markaAdi);
  console.log(parametre.sehirAdi);
  const query = req.query;
  console.log(query);
  console.log(query.min);
  console.log(query.max);
  res.render("arac", {
    title: "Araçlar",
    markaAdi: parametre.markaAdi,
    sehirAdi: parametre.sehirAdi,
    max: query.max,
    min: query.min,
  });
  // res.json({ parametre: req.params.markaAdi });
};

const Post = (req, res) => {
  res.status(201).json({ message: "İstek başarılı" });
};

const Patch = (req, res) => {
  res.status(201).json({ message: "İstek başarılı" });
};

module.exports = { arac, Index, Post, Patch };
