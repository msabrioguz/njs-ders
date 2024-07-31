const db = require('./db/index');

const connectToDb = async () => {
    await db.connect();
    console.log("Baglantı kuruldu");
}
connectToDb();
