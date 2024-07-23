const GlobalMiddleware1 = (req, res, next) => {
  console.log(req.url);
  if (!req.url.includes("/merhaba")) {
    if (req.query.adi === "Mustafa") {
      console.log("Middleware 1 çalışıyor...");
      next();
    } else {
      console.log("Adı Mustafa olan geçebilir.");
      res.send("Adı Mustafa olan geçebilir.");
    }
  } else {
    next();
  }
};

const GlobalMiddleware2 = (req, res, next) => {
  if (!req.url.includes("/merhaba")) {
    if (Number(req.query.yas) === 25) {
      console.log("Middleware 2");
      next();
    } else {
      console.log("Yaşı 25 olan geçebilir.");
      res.send("Yaşı 25 olan geçebilir.");
    }
  } else {
    next();
  }
};

module.exports = { GlobalMiddleware1, GlobalMiddleware2 };
