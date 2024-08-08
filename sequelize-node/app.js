const express = require("express");
const app = express();
const router = express.Router();
const { Op, QueryTypes } = require("sequelize");
const db = require("./db");
// const createTable = require('./db/createTables');
const TestModel = require("./models/test-model");

router.post("/createData", async (req, res) => {
  const { name, lastName, eMail, age } = req.body;
  createData(name, lastName, age, eMail);
  res.status(201).json({ msg: "Veri başarıyla eklendi." });
});

router.post("/createDataM", async (req, res) => {
  const { name, lastName, eMail, age } = req.body;

  try {
    const result = await TestModel.create({
      name: name,
      lastName: lastName,
      eMail: eMail,
      age: age,
    });

    console.log(result);
    res.status(200).json({ msg: "Veri başarıyla eklendi." });
  } catch (error) {
    res.status(500).json({ msg: "Hata: Veri eklenemedi.", hata: error });
    console.log(error);
  }
});

router.post("/createMultiple", async (req, res) => {
  const data = req.body;

  try {
    const result = await TestModel.bulkCreate(data);
    res.json({ msg: "Veriler başarıyla eklendi.", result });
  } catch (error) {
    console.log(error);
    res.json({ msg: "bir hata oluştu.", hata: error });
  }
});

router.get("/getAllData", async (req, res) => {
  try {
    const result = await TestModel.findAll();
    // console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json({ msg: "Bir hata oluştu.", hata: error });
  }
});

router.delete("/deleteData/:dataId", async (req, res) => {
  const { dataId } = req.params;

  try {
    const findedData = await TestModel.findByPk(dataId);
    if (findedData) {
      const result = await findedData.destroy();
      console.log("Veri silindi.");
      res
        .status(200)
        .json({ msg: "Veri başarıyla silinmiştir.", silinenVeri: result });
    } else {
      res
        .status(500)
        .json({ msg: "Hata oluştu.", error: "Aradığınız veri bulunamadı." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hata oluştu.", hata: error });
  }

  // try {
  //   const result = await TestModel.destroy({ where: { id: dataId } });
  //   if (result) {
  //     console.log("Veri silindi.");
  //     res.json({msg: "Veri başarıyla silinmiştir."})
  //   }
  // } catch (error) {
  //   console.log(error);
  //   res.json({msg: "Hata oluştu.", error: error})
  // }
});

router.post("/findOrCreate", async (req, res) => {
  const { testModel } = req.body;
  try {
    const [data, isCreated] = await TestModel.findOrCreate({
      where: {
        name: testModel.name,
      },
      defaults: testModel,
    });

    console.log("data:", data);
    if (isCreated) {
      res.status(200).json({ isExist: false, ...data });
      console.log("isCreated:", isCreated);
    } else {
      res.status(200).json({ isExist: true, ...data });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hata gerçekleşti.", hata: error });
  }
});

router.put("/updateData/:dataId", async (req, res) => {
  const { dataId } = req.params;
  const { name, lastName, eMail, age } = req.body;
  try {
    const isUpdated = await TestModel.update(
      { name: name, lastName: lastName, eMail: eMail, age: age },
      { where: { id: dataId } }
    );
    res.status(200).json(isUpdated);
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ message: "Hata gerçekleşti." });
  }
});

router.get("/getTestDataById/:dataId", async (req, res) => {});

app.use(express.json());
app.use(router);

app.listen(5000, async () => {
  await db.connect();
});

const connectToDb = async () => {
  await db.connect();
  // await db.createTables();
};

// Uygulama Başlatılıyor.
//connectToDb();

const createData = async (name, lastName, age, eMail) => {
  // const test = new TestModel({
  //     name: "Ayhan",
  //     age: 29
  // });
  try {
    const result = await TestModel.create({
      name: name,
      lastName: lastName,
      age: age,
      eMail: eMail,
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
    { name: "Can", lastName: "Arabacı", eMail: "istanbul@gmail.com", age: 15 },
    { name: "Veli", lastName: "Tuğlacı", eMail: "mersin@gmail.com", age: 33 },
    {
      name: "Selahattin",
      lastName: "Karakaş",
      eMail: "ankara@gmail.com",
      age: 43,
    },
    { name: "Mustafa", lastName: "Oğuz", eMail: "antalya@gmail.com", age: 35 },
    { name: "Mehmet", lastName: "Oğuz", eMail: "balikesir@gmail.com", age: 65 },
    { name: "Aliye", lastName: "Sert", eMail: "eskisehir@gmail.com", age: 22 },
    { name: "Selami", lastName: "Türk", eMail: "yalova@gmail.com", age: 12 },
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

  result.rows.forEach((item) => {
    console.log("item", JSON.stringify(item.dataValues));
  });
};

const findByIdFullName = async (id) => {
  const result = await TestModel.findByPk(id);
  console.log(result.fullName);
};

const getQueryWithSequelize = async () => {
  const result = await db.sequelize.query(
    "SELECT * FROM tests WHERE id = :testid",
    {
      replacements: {
        testid: 2,
      },
      type: QueryTypes.SELECT,
    }
  );

  console.log("result:", result);
};

const createWithTransaction = async () => {
  const transcation = await db.sequelize.transaction();

  try {
    const result = await TestModel.create({
      name: "Mustafa",
      lastName: "Oğuz",
      eMail: "mustafa@gmail.com",
      age: 25,
    });

    await transcation.commit();
    console.log(result);
  } catch (error) {
    await transcation.rollback();
    console.log(error);
  }
};

// db.createTables();
// createData();
// findAllData();
// findById(5);
// findByFilter("Ayhan");
// filterData(29);
// findDataByFilter();
// deleteById(10);
// updateById(2, "Ayhan");
// createMultipleData();
// findOrCreate();
// findCountAll();
// findByIdFullName(5);
// getQueryWithSequelize();
// createWithTransaction();
