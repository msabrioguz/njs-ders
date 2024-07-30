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
        FOREIGN KEY (personel_cv_id) REFERENCES personel_cv(personel_cv_id)
        )`);
        console.log(result);
      }
    }
  );
};

const createOneToOneTableCascade = () => {
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
      }
    );
};

const createPersonel = (cvAdi, ad, soyad, maas) => {
  const queryCV = `INSERT INTO personel_cv (personel_cv_adi) VALUES (?)`;
  connection.query(queryCV, [cvAdi], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const cvId = result.insertId;
      const queryPersonel = `INSERT INTO personel (personel_cv_id, personel_adi, personel_soyadi, personel_maas) VALUES (?, ?, ?, ?)`;
      connection.query(
        queryPersonel,
        [cvId, ad, soyad, maas],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Personel result:", result);
          }
        }
      );
      console.log("Cv Result", result);
    }
  });
};

const getAllRelations = () => {
  // const query = "SELECT * FROM personel_cv, personel WHERE personel_cv.personel_cv_id = personel.personel_cv_id";
  const query =
    "SELECT p.personel_id, p.personel_adi, p.personel_soyadi, p.personel_maas, pc.personel_cv_adi FROM personel AS p INNER JOIN personel_cv AS pc ON p.personel_cv_id = pc.personel_cv_id";
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};

const updateCV = (id, ad) => {
  const query =
    "SELECT p.personel_id, p.personel_cv_id FROM personel AS p WHERE p.personel_id = ?";
  connection.query(query, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      const cvId = result[0].personel_cv_id;
      const query = `UPDATE personel_cv SET personel_cv_adi = ? WHERE personel_cv_id = ?`;
      connection.query(query, [ad, cvId], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      });
    }
  });
};

const deleteCV = (id) => {
  const query =
    "SELECT p.personel_id, p.personel_cv_id FROM personel AS p WHERE p.personel_id = ?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      const cvId = result[0].personel_cv_id;
      const query = `DELETE FROM personel_cv WHERE personel_cv_id = ?`;
      connection.query(query, [cvId], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      });
    }
  });
};

connection.connect((err) => {
  if (err) {
    console.log("hata", err);
  }

  console.log("baglanti kuruldu");

  // İşlemler
  // createOneToOneTable();
  // createOneToOneTableCascade();
  // createPersonel("Donanım", "Yasin", "Cihan", 2000);
  // createPersonel("Yazılım", "Mustafa", "Oğuz", 2000);
  // getAllRelations();
  // updateCV(1, "Yazılım");
  deleteCV(2);
});
