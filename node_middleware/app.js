const express = require("express");
const app = express();

const router = express.Router();

const { indexPage, testPage, merhabaPage } = require("./controller/index");

const { GlobalMiddleware1, GlobalMiddleware2 } = require("./middleware/GlobalMiddleware");
const middleware1 = require("./middleware/HomeRouteMiddleware");
const middleware2 = require("./middleware/HomeRouteMiddleware2");


router.get("/", [middleware1, middleware2], indexPage);

router.get("/test", testPage);

router.get("/merhaba", merhabaPage);

app.use(GlobalMiddleware1);
app.use(GlobalMiddleware2);

app.use(router);

app.listen(5000, () => {
  console.log("Server started on port 5000\nServer: http://localhost:5000");
});
