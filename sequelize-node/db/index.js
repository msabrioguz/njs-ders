const { Sequelize } = require("sequelize");

const db = { force: true };

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
  const TestModel = require("../models/test-model");
  const User = require("../models/user");

  await TestModel.sync({ force: db.force });
  await User.sync({ force: db.force });

  if (db.force) {
    console.log("Veritabanı tabloları oluşturuldu.");
  }
};

module.exports = db;
