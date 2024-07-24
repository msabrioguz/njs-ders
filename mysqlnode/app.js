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

connection.connect((err) => {
  if (err) {
    console.log("hata", err);
  }
  //   connection.query("CREATE DATABASE egitimdb", (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(result);
  //     }
  //   });
  console.log("baglanti kuruldu");

  connection.query(
    "CREATE TABLE ogrenciler (id INT AUTO_INCREMENT NOT NULL, ad VARCHAR(255) NOT NULL, soyad VARCHAR(255) NOT NULL, PRIMARY KEY (id))",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});
