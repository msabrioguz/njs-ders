const express = require("express");
const jwt = require("jsonwebtoken");
const jwtMiddleware = require("./jwtMiddleware");

const app = express();
const router = express.Router();

app.use(express.json());

router.get("/", (req, res) => {
  res.send("Merhaba");
});
router.post("/login", (req, res) => {
  // db kontrolü ve sonuca göre token oluştur.
  const { username, password } = req.body;
  const token = jwt.sign({ ad: username, id: 1 }, "deneme123.", {
    expiresIn: "2m",
  });
  res.header("auth-token", token);
  res.json({ name: username, password: password, token: token });
});

router.get("/register", (req, res) => {
  res.send("Kayıt sayfası");
});

router.post("/register", (req, res) => {
  res.send("Kayıt");
});

router.get("/users", jwtMiddleware, (req, res) => {
  res.send("Kullanıcılar Sayfası " + req.user.ad);
});

// app.use(jwtMiddleware);
app.use(router);

app.listen(5000, () => {
  console.log("Server started on port http://localhost:5000");
});
