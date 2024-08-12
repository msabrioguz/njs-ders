const { Sequelize } = require("sequelize");

const db = { force: false };

const sequelize = new Sequelize("sequelize_db", "root", "654333", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  pool: 40,
  timezone: "+03:00",
  retry: 3,
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.connect = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.sequelize.authenticate();
      console.log("Baglantı kuruldu.");
      resolve(db);
    } catch (error) {
      console.log("Hata: ", error);
      reject(error);
    }
  });
};

db.createTables = async () => {
  const User = require("../models/user-model");
  const Social = require("../models/social-model");

  // İlişkisel Veritabanı
  User.hasMany(Social);
  Social.belongsTo(User);

  // Tabloların Sekronize Edilmesi
  sequelize
    .sync({ force: db.force })
    .then(() => {
      console.log("Sekronize oldu.");
    })
    .catch((error) => console.log(error));

  if (db.force) {
    console.log("Veritabanı tabloları oluşturuldu.");
  }
};

module.exports = db;
