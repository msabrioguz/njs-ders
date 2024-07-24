const jwt = require("jsonwebtoken");

const authControl = (req, res, next) => {
    if (req.headers.authorization) {
      const token = req.headers["authorization"].split(" ")[1];
      
      jwt.verify(token, "deneme123.", (err, decoded) => {
        if (err) {
            if(err.name === "TokenExpiredError"){
                res.status(401).json({durum: false, mesaj:"Token süresi dolmuş. Yeniden giriş yapınız.", kodu: err.name});
            }else{
                res.send("Geçersiz Token");
            }
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      res.status(401).json({ message: "Lütfen giriş yapınız." });
    }
};

module.exports = authControl;
