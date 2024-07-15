const router = require("express").Router();
const path = require("path");
const controller = require("../controller/indexController");

const projectMainFolder = path.join(
  __dirname.substr(0, __dirname.lastIndexOf("\\"))
);

// Rotalar
router.get("/", (req, res) => {
  controller.Index(req, res);
});

router.get("/:markaAdi/arac/:sehirAdi", (req, res) => {
  controller.arac(req, res);
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
