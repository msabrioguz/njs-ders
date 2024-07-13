const router = require("express").Router();
const path = require("path");

const projectMainFolder = path.join( __dirname.substr(0, __dirname.lastIndexOf("\\")));

// Rotalar
router.get("/", (req, res) => {
    res.sendFile(projectMainFolder + "/html/index.html");
  });
  
  router.get("/:markaAdi/arac/:sehirAdi", (req, res) => {
    const parametre = req.params;
    console.log(parametre.markaAdi);
    console.log(parametre.sehirAdi);
    const query = req.query;
    console.log(query);
    console.log(query.min);
    console.log(query.max);
    res.sendFile(projectMainFolder + "/html/arac.html");
    // res.json({ parametre: req.params.markaAdi });
  });

router.post("/", (req, res) => {
  res.status(201).json({ message: "İstek başarılı" });
});

router.delete("/", (req, res) => {
  res.json({ message: "İşlem silindi." });
});

router.put("/", (req, res) => {
  res.json({ message: "İslem guncellendi." });
});

router.use((req, res) => {
  res.status(404).sendFile(projectMainFolder + "/html/404.html");
});

module.exports = router;
