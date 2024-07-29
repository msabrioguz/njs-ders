const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "654333",
  database: "egitimdb",
  waitForConnections: true,
  connectionLimit: 10,
  charset: "UTF8_GENERAL_CI",
  port: 3306,
  timezone: "+03:00",
});

const createOneToOneTable = () => {
  connection.query(
    `CREATE TABLE personel_cv
    (personel_cv_id INT AUTO_INCREMENT PRIMARY KEY,
    personel_cv_adi VARCHAR(100))
    `, 
    (err, result) => {
    if (err) {
      console.log(err);
    } else {
      connection.query(`CREATE TABLE personel
      ( personel_id INT AUTO_INCREMENT PRIMARY KEY,
        personel_cv_id INT NOT NULL,
        personel_adi VARCHAR(100),
        personel_soyadi VARCHAR(100),
        personel_maas INT,
        FOREIGN KEY (personel_cv_id) REFERENCES personel_cv(personel_cv_id) ON DELETE CASCADE
        )`);
      console.log(result);
    }
  });
};


connection.connect((err) => {
  if (err) {
    console.log("hata", err);
  }

  console.log("baglanti kuruldu");

  // İşlemler
  createOneToOneTable();
});
