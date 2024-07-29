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

const createOneToManyTable = () => {
  connection.query(
    `CREATE TABLE kisiler
    (kisi_id INT AUTO_INCREMENT PRIMARY KEY,
    kisi_adi VARCHAR(100),
    kisi_soyadi VARCHAR(100))`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        connection.query(
          `CREATE TABLE sosyal_medya
          (sosyal_medya_id INT AUTO_INCREMENT PRIMARY KEY,
          kisi_id INT NOT NULL,
          sosyal_medya_adi VARCHAR(100),
          FOREIGN KEY (kisi_id) REFERENCES kisiler(kisi_id) ON DELETE RESTRICT)`,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
            }
          }
        );
      }
    }
  );
};

const createOneToManyTableCascade = () => {
  connection.query(
    `CREATE TABLE kisiler
    (kisi_id INT AUTO_INCREMENT PRIMARY KEY,
    kisi_adi VARCHAR(100),
    kisi_soyadi VARCHAR(100))`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        connection.query(
          `CREATE TABLE sosyal_medya
          (sosyal_medya_id INT AUTO_INCREMENT PRIMARY KEY,
          kisi_id INT NOT NULL,
          sosyal_medya_adi VARCHAR(100),
          FOREIGN KEY (kisi_id) REFERENCES kisiler(kisi_id) ON DELETE CASCADE)`,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
            }
          }
        );
      }
    }
  );
};

const createUser = (name, surname) => {
  const query = `INSERT INTO kisiler
  (kisi_adi, kisi_soyadi)
  VALUES
  (?, ?)`;
  connection.query(query, [name, surname], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};

const createSocialMediaWithUser = (kisi_id, sosyal_medya_adi) => {
  const query = `INSERT INTO sosyal_medya
  (kisi_id, sosyal_medya_adi)
  VALUES
  (?, ?)`;
  connection.query(query, [kisi_id, sosyal_medya_adi], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};

const getAllRelationsData = () => {
  const query =
    "SELECT * FROM kisiler AS k INNER JOIN sosyal_medya AS s ON k.kisi_id = s.kisi_id";
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};

const getRelationsById = (id) => {
  const query =
    "SELECT k.kisi_adi, k.kisi_soyadi, s.sosyal_medya_id, s.sosyal_medya_adi FROM kisiler AS k INNER JOIN sosyal_medya AS s ON k.kisi_id = s.kisi_id WHERE k.kisi_id = ?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};

const updateById = (kisi_id, sosyal_medya_id, sosyal_medya_adi) => {
  const query = `UPDATE sosyal_medya SET sosyal_medya_adi = ? WHERE kisi_id = ? AND sosyal_medya_id = ?`;
  connection.query(
    query,
    [sosyal_medya_adi, kisi_id, sosyal_medya_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
};

const deleteById = (kisi_id) => {
  const query = `DELETE FROM kisiler WHERE kisi_id = ?`;
  connection.query(query, [kisi_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
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
  // createOneToManyTable();
  // createOneToManyTableCascade();
  // createUser("Mustafa", "Oğuz");
  // createUser("Ayhan", "Dağ");
  // createUser("Yasin", "Cihan");
  // createUser("Vedat", "Fil");
  // createSocialMediaWithUser(1, "instagram");
  // createSocialMediaWithUser(1, "facebook");
  // createSocialMediaWithUser(1, "twitter");
  // createSocialMediaWithUser(2, "linkedin");
  // createSocialMediaWithUser(3, "youtube");
  // createSocialMediaWithUser(4, "instagram");
  // createSocialMediaWithUser(3, "instagram");

  // getAllRelationsData();
  // getRelationsById(3);
  // getRelationsById(4);
  // getRelationsById(5);

  // updateById(3, 1, "Pinterest");

  deleteById(1);
});
