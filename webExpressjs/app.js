const express = require("express");
const ac = require("ansi-colors");

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
  res.sendFile(__dirname + "/html/test.html");
});

app.listen(5000, () => {
  console.log(
    ac.red("Sunucu başlatıldı.\n") +
      ac.white("http://localhost") +
      ac.yellow(":") +
      ac.white("5000"),
    ac.green("adresi üzerinden ulaşabilirsiniz.", ac.symbols.info)
  );
});
