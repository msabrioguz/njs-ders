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
    
    const test = new TestModel({
        name: "Mustafa",
        age: 25
    });
    try {
        const result = await test.save();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
    console.log("Veritabanına veri eklendi.");
}

createData();