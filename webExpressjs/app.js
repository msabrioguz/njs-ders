const express = require("express");
const app = express();
const ac = require("ansi-colors");

app.get("/", (req, res) => {
    res.send("Merhaba Express!");
});

app.listen(5000, () => {
  console.log(
    ac.red("Sunucu başlatıldı.\n") +
    ac.yellow("http://localhost:5000"),
    ac.green("adresi üzerinden ulaşabilirsiniz.", ac.symbols.info)
  );
});
