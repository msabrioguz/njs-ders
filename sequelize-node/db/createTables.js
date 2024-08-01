const TestModel = require("../models/test-model");
const User = require("../models/user");

const Force = false;

const createTable = async () => {
  await TestModel.sync({ force: Force });
  await User.sync({ force: Force });

  if (Force) {
    console.log("Veritabanı tabloları oluşturuldu.");
  }
};

module.exports = createTable;
