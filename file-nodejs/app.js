const express = require("express");
const fs = require("fs");

const app = express();
const singleFileUpload = require("./singleFileUpload");

app.use(express.json());

const router = express.Router();

if(!fs.existsSync("./uploads")){
    fs.mkdirSync("./uploads");
}

router.get("/", (req, res) => {
  res.send("Merhaba");
});

router.post("/fileUpload", (req, res) => {
  singleFileUpload(req, res, (err) => {
    if (err) {
      console.log("Hata Mevcut: ", err);
      res.send(err);
    } else {
      console.log("Body: ", req.body);
      console.log("Deneme: ", req.file);
      res.json({ message: "Dosya yüklendi" });
    }
  });

  //console.log(req.body, req.file);
});

app.use(router);

app.listen(5000, () => {
  console.log("Server started on port http://localhost:5000");
});
