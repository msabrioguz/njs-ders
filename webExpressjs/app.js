const express = require("express");
const ac = require("ansi-colors");
const lib = require("./lib");
const os = require("os");
const qrcode = require("qrcode-terminal");
const appRouter = require("./routes/router.js");

const app = express();

app.use(express.static("assets"));
app.use(express.static("html"));
app.set('view engine', 'ejs');
// app.set('views', './deneme');

app.use(appRouter);

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
