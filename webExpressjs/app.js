const express = require("express");
const ac = require("ansi-colors");
const lib = require("./lib");
const os = require("os");
const qrcode = require("qrcode-terminal");

const app = express();

app.use(express.static("assets"));

// Rotalar
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/html/index.html");
});

app.get("/user", (req, res) => {
  res.sendFile(__dirname + "/html/user.html");
});

app.get("/profile", (req, res) => {
  res.sendFile(__dirname + "/html/profile.html");
});

app.get("/test", (req, res) => {
  res.redirect("/user");
});

app.get("/getjson", (req, res) => {
  res.json(
    [{ id: 1, name: "Mustafa", surname: "Oguz", age: 21 }, { id: 2, name: "Mustafa", surname: "Oguz", age: 21 }, { id: 3, name: "Mustafa", surname: "Oguz", age: 21 }]
  );
  // res.json({
  //   name: "Mustafa",
  //   surname: "Oguz",
  //   age: 21,
  // });
});

app.listen(5000, () => {
  console.log(
    ac.red("Sunucu başlatıldı.\n") +
      ac.blue("http://localhost") +
      ac.red(":") +
      ac.blue("5000\n")
    +
    ac.greenBright("http://" + lib.module.getLocalIp() + ":5000"),
    ac.yellow("adresi üzerinden ulaşabilirsiniz."),
    ac.symbols.mark
  );

  qrcode.generate("http://" + lib.module.getLocalIp() + ":5000", {
    small: true,
  });
});
