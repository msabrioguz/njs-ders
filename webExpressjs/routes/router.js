const router = require("express").Router();
const path = require("path");
const controller = require("../controller/indexController");
const userController = require("../controller/userController");

const projectMainFolder = path.join(
  __dirname.substr(0, __dirname.lastIndexOf("\\"))
);

// Rotalar
router.get("/", controller.Index);

router.get("/:markaAdi/arac/:sehirAdi", controller.arac);

router.post("/", controller.Post);

router.delete("/", (req, res) => {
  res.json({ message: "İşlem silindi." });
});

router.put("/", (req, res) => {
  res.json({ message: "İslem guncellendi." });
});

router.patch("/", controller.Patch);

router.get('/users', userController.index);

router.use((req, res) => {
  res.status(404).render("404-NotFound");
});



module.exports = router;
