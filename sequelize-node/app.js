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
      name: "Can",
      age: 15,
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
    if (result) {
      console.log("Veri silindi.");
    }
  } catch (error) {
    console.log(error);
  }
};

const updateById = async (id, name) => {
  try {
    const result = await TestModel.update(
      { name: name },
      { where: { id: id } }
    );
    if (result) {
      console.log("Veri güncellendi.", result);
    }
  } catch (error) {
    console.log(error);
  }
};

const createMultipleData = async () => {
  const result = await TestModel.bulkCreate([
    { name: "Ayhan", lastName: "Dağ", eMail: "adana@gmail.com", age: 29 },
    { name: "Can", lastName: "Arabacı", eMail: "istanbul@gmail.com",age: 15 },
    { name: "Veli", lastName: "Tuğlacı", eMail: "mersin@gmail.com",age: 33 },
    { name: "Selahattin", lastName: "Karakaş", eMail: "ankara@gmail.com",age: 43 },
    { name: "Mustafa", lastName: "Oğuz", eMail: "antalya@gmail.com",age: 35 }, 
    { name: "Mehmet", lastName: "Oğuz", eMail: "balikesir@gmail.com",age: 65 }, 
    { name: "Aliye", lastName: "Sert", eMail: "eskisehir@gmail.com",age: 22 }, 
    { name: "Selami", lastName: "Türk", eMail: "yalova@gmail.com",age: 12 }, 
  ]);
  console.log(result);
};

const findOrCreate = async () => {
  const [data, isCreated] = await TestModel.findOrCreate({
    where: {
      name: "Yakup",
    },
    defaults: {
      name: "Yakup",
      age: 45,
    },
  });

  if (isCreated) {
    console.log("Veri eklendi.", data);
  } else {
    console.log("Data:", data);
  }
};

const findCountAll = async () => {
  const result = await TestModel.findAndCountAll({
    limit: 5,
    offset: 8,
  });

  result.rows.forEach((item)=>{
    console.log('item', JSON.stringify(item.dataValues));
  });
};

const findByIdFullName = async (id) => {
  const result = await TestModel.findByPk(id);
  console.log(result.fullName);
};

// db.createTables();
// createData();
// findAllData();
findById(5);
// findByFilter("Ayhan");
// filterData(29);
// findDataByFilter();
// deleteById(10);
// updateById(5, "Ayhan");
// createMultipleData();
// findOrCreate();
// findCountAll();
// findByIdFullName(5);