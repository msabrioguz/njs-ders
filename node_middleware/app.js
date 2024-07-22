const express = require("express");
const app = express();

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Hello World!");
});

router.get("/test", (req, res, next) => {
  res.send("Test");
});

app.use((req, res, next) => {
  console.log(req.query);
  if (req.query.adi === "Mustafa") {
    console.log("Middleware 1 çalışıyor...");
    next();
  } else {
    console.log("Adı Mustafa olan geçebilir.");
    res.send("Adı Mustafa olan geçebilir.");
  }
});

app.use((req, res, next) => {
  if (Number(req.query.yas) === 25) {
    console.log("Middleware 2");
    next();
  } else {
    console.log("Yaşı 25 olan geçebilir.");
    res.send("Yaşı 25 olan geçebilir.");
  }
});

app.use(router);

app.listen(5000, () => {
  console.log("Server started on port 5000\nServer: http://localhost:5000");
});
