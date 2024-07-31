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

const createManyToManyTable = () => {
  connection.query(
    `CREATE TABLE gonderi (gonderi_id INT AUTO_INCREMENT PRIMARY KEY, gonderi_adi VARCHAR(100))`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        connection.query(
          `CREATE TABLE etiket (etiket_id INT AUTO_INCREMENT PRIMARY KEY, etiket_adi VARCHAR(100))`,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              connection.query(
                `CREATE TABLE gonderi_etiket 
            (gonderi_etiket_id INT AUTO_INCREMENT PRIMARY KEY, 
            gonderi_id INT NOT NULL, 
            etiket_id INT NOT NULL, 
            FOREIGN KEY (gonderi_id) REFERENCES gonderi(gonderi_id), 
            FOREIGN KEY (etiket_id) REFERENCES etiket(etiket_id))`,
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(result);
                  }
                }
              );
              console.log(result);
            }
            console.log(result);
          }
        );
      }
    }
  );
};

const createData = (data) => {
  const query = `INSERT INTO gonderi (gonderi_adi) VALUES (?)`;
  connection.query(query, [data.gonderi_adi], (err, result) => {
    if (err) {
      console.log("gonderi hata:", err);
    } else {
      console.log("gonderi:", result);
      const gonderiId = result.insertId;
      const etiketIds = [];

      for (let i = 0; i < data.etiket.length; i++) {
        const queryEtiket = `INSERT INTO etiket (etiket_adi) VALUES (?)`;
        connection.query(queryEtiket, [data.etiket[i]], (err, result) => {
          if (err) {
            console.log("etiket hata:", err);
          } else {
            const querygonderi_etiket = `INSERT INTO gonderi_etiket (gonderi_id, etiket_id) VALUES (?, ?)`;
            connection.query(
              querygonderi_etiket,
              [gonderiId, result.insertId],
              (err, result) => {
                if (err) {
                  console.log("gönderi etiket hata:", err);
                } else {
                  console.log("gönderi etiket:", result);
                }
              }
            );
            console.log("etiket:", result);
          }
        });
      }
    }
  });
};

const createOtherData = (data) => {
  const query = `INSERT INTO gonderi (gonderi_adi) VALUES (?)`;
  connection.query(query, [data.gonderi_adi], (err, result) => {
    if (err) {
      console.log("gonderi hata:", err);
    } else {
      console.log("gonderi:", result);
      const gonderiId = result.insertId;

      for (let index = 0; index < data.etiket.length; index++) {
        const querygonderi_etiket = `INSERT INTO gonderi_etiket (gonderi_id, etiket_id) VALUES (?, ?)`;
        connection.query(
          querygonderi_etiket,
          [gonderiId, data.etiket[index]],
          (err, result) => {
            if (err) {
              console.log("gönderi etiket hata:", err);
            } else {
              console.log("gönderi etiket:", result);
            }
          }
        );
      }
    }
  });
};

const getAllData = (id) => {
  const query = `SELECT * FROM gonderi_etiket AS ge 
  INNER JOIN gonderi AS g ON ge.gonderi_id = g.gonderi_id 
  INNER JOIN etiket AS e ON ge.etiket_id = e.etiket_id
  WHERE g.gonderi_id = ?`;

  connection.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const gonderi = {};
      const etiketler = [];

      for (let i = 0; i < result.length; i++) {
        etiketler.push(result[i].etiket_adi);
      }

      gonderi.gonderi_adi = result[0].gonderi_adi;
      gonderi.etiket = etiketler;
      console.log("Gönderi:", gonderi);
      // console.log(result);
    }
  });
};

const mydata = {
  gonderi_adi: "Merhaba bugün hava çok güzel",
  etiket: ["#yazilim", "#donanim", "#yapayzeka"],
};

const mydata2 = {
  gonderi_adi: "Kitap okumak çok güzel bir şey.",
  etiket: [1, 3],
};

const updateGonderi = (gonderi_id, old_etiket_id, new_etiket_id) => {
  const query = `UPDATE gonderi_etiket SET etiket_id = ? WHERE gonderi_id = ? AND etiket_id = ?`;
  connection.query(
    query,
    [new_etiket_id, gonderi_id, old_etiket_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
};

const removeEtiketFromGonderi = (gonderi_id, etiket_id) => {
  const query = `DELETE FROM gonderi_etiket WHERE gonderi_id = ? AND etiket_id = ?`;
  connection.query(query, [gonderi_id, etiket_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};

const createWithTransaction = (data) => {
  connection.beginTransaction((err) => {
    if (err) {
      connection.rollback();
      connection.end();
    } else {
      const query = `INSERT INTO gonderi (gonderi_adi) VALUES (?)`;
      connection.query(query, [data.gonderi_adi], (error, result) => {
        if (error) {
          connection.rollback();
          //connection.end();
          console.log("gonderi hata:", error);
          return;
        } else {
          console.log("gonderi:", result);
          const gonderiId = result.insertId;
          const etiketIds = [];

          for (let i = 0; i < data.etiket.length; i++) {
            const queryEtiket = `INSERT INTO etiket (etiket_adi) VALUES (?)`;
            connection.query(queryEtiket, [data.etiket[i]], (err, result) => {
              if (err) {
                connection.rollback();
                // connection.end();
                console.log("etiket hata:", err);
                return;
              } else {
                const querygonderi_etiket = `INSERT INTO gonderi_etiket (gonderi_id, etiket_id) VALUES (?, ?)`;
                connection.query(
                  querygonderi_etiket,
                  [gonderiId, result.insertId],
                  (err, result) => {
                    if (err) {
                      connection.rollback();
                      // connection.end();
                      console.log("gönderi etiket hata:", err);
                      return;
                    } else {
                      connection.commit();
                      console.log("gönderi etiket:", result);
                    }
                  }
                );
                console.log("etiket:", result);
              }
            });
          }
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
  // createManyToManyTable();
  // createData(mydata);
  // createOtherData(mydata2);
  // getAllData(1);
  // updateGonderi(1, 1, 4);
  // removeEtiketFromGonderi(1, 4);
  createWithTransaction(mydata);

  connection.end();
});
