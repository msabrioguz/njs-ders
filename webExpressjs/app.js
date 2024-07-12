const express = require("express");
const ac = require("ansi-colors");
const lib = require("./lib");
const os = require("os");
const qrcode = require("qrcode-terminal");
const router = express.Router();

const app = express();

app.use(express.static("assets"));

// Rotalar
router.get("/", (req, res) => {
  res.sendFile(__dirname + "/html/index.html");
});

router.get("/:markaAdi/arac/:sehirAdi", (req, res) => {
  const parametre = req.params;
  console.log(parametre.markaAdi);
  console.log(parametre.sehirAdi);
  const query = req.query;
  console.log(query);
  console.log(query.min);
  console.log(query.max);
  res.sendFile(__dirname + "/html/arac.html");
  // res.json({ parametre: req.params.markaAdi });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "İstek başarılı" });
});

router.delete("/", (req, res) => {
  res.json({ message: "İşlem silindi." });
});

router.put('/', (req, res) => {
  res.json({ message: "İslem guncellendi." });
})

app.use(router);

app.listen(5000, () => {
  console.log(
    ac.red("Sunucu başlatıldı.\n") +
      ac.blue("http://localhost") +
      ac.red(":") +
      ac.blue("5000\n") +
      ac.greenBright("http://" + lib.module.getLocalIp() + ":5000"),
    ac.yellow("adresi üzerinden ulaşabilirsiniz."),
    ac.symbols.mark
  );

  qrcode.generate("http://" + lib.module.getLocalIp() + ":5000", {
    small: true,
  });
});
