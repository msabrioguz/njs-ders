const db = require('./db');
// const createTable = require('./db/createTables');
const TestModel = require("./models/test-model");

const connectToDb = async () => {
    await db.connect();
    // await db.createTables();
    console.log("Veritabanına bağlanılıyor...");
}

// Uygulama Başlatılıyor.
connectToDb();

const createData = async () => {
    
    // const test = new TestModel({
    //     name: "Ayhan",
    //     age: 29
    // });
    try {
        const result = await TestModel.create({
            name: "Ayhan",
            age: 29
        })
        // const result = await test.save();
        console.log(result.dataValues);
    } catch (error) {
        console.log(error);
    }
    console.log("Veritabanına veri eklendi.");
}

const findAllData = async () => {
    const result = await TestModel.findAll({attributes: ['name', 'age']});
    result.forEach(item => {
        console.log(item.dataValues);
    });
}

// createData();

findAllData();