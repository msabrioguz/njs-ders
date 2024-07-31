const { Sequelize } = require("sequelize");

const db = {};

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

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Baglantı kuruldu.");
  } catch (error) {
    console.log("Hata: ", error);
  }
};

module.exports = { db, connectToDb };
