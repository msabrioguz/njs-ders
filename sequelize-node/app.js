const { where, Op } = require("sequelize");
const db = require("./db");
// const createTable = require('./db/createTables');
const TestModel = require("./models/test-model");

const connectToDb = async () => {
  await db.connect();
  // await db.createTables();
  console.log("Veritabanına bağlanılıyor...");
};

// Uygulama Başlatılıyor.
connectToDb();

const createData = async () => {
  // const test = new TestModel({
  //     name: "Ayhan",
  //     age: 29
  // });
  try {
    const result = await TestModel.create({
      name: "Vedat",
      age: 33,
    });
    // const result = await test.save();
    console.log(result.dataValues);
  } catch (error) {
    console.log(error);
  }
  console.log("Veritabanına veri eklendi.");
};

const findAllData = async () => {
  const result = await TestModel.findAll({ attributes: ["name", "age"] });
  result.forEach((item) => {
    console.log(item.dataValues);
  });
};

const findById = async (id) => {
  const result = await TestModel.findByPk(id);
  console.log(result.dataValues);
};

const findByFilter = async (name) => {
  const result = await TestModel.findAll({
    where: {
      name: name,
    },
  });
  result.forEach((item) => {
    console.log(item.dataValues);
  });
};

const findDataByFilter = async () => {
  const result = await TestModel.findAll({
    where: { name: { [Op.startsWith]: "Ya" } },
  });
  result.forEach((item) => {
    console.log(item.dataValues);
  });
};

const filterData = async (age) => {
  const result = await TestModel.findOne({ where: { age: age } });
  console.log(result.dataValues);
};

const deleteById = async (id) => {
  try {
    const result = await TestModel.destroy({ where: { id: id } });
    if(result){
        console.log("Veri silindi.")
    }
  } catch (error) {
    console.log(error);
  }
};

// createData();
// findAllData();
// findById(5);
// findByFilter("Ayhan");
// filterData(29);
// findDataByFilter();
deleteById(10);
