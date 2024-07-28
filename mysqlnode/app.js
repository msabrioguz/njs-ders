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

const createDB = () => {
  connection.query("CREATE DATABASE egitimdb", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};

const createTable = () => {
  connection.query(
    "CREATE TABLE IF NOT EXISTS ogrenciler (id INT AUTO_INCREMENT NOT NULL, ad VARCHAR(255) NOT NULL, soyad VARCHAR(255) NOT NULL, PRIMARY KEY (id))",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
};

const createRecord = () => {
  const query = "INSERT INTO ogrenciler (ad, soyad) VALUES ('Ahmet', 'Koç')";
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};

const createMultibleRecords = () => {
  const studentArray = [
    ["Ahmet", "Koç"],
    ["Ali", "Veli"],
    ["Mehmet", "Koç"],
    ["Ahmet", "Turan"],
    ["Ali", "Turan"],
    ["Mehmet", "Turan"],
  ];
  const query2 = "INSERT INTO ogrenciler (ad, soyad) VALUES ?";
  connection.query(query2, [studentArray], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};

const createDynamicRecord = () => {
  const name = process.argv[2];
  const surname = process.argv[3];

  const query = "INSERT INTO ogrenciler (ad, soyad) VALUES (?, ?)";
  connection.query(query, [name, surname], (err, result) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log("Result: ", result);
    }
  });
};

const selectMyData = () => {
  const query = "SELECT * FROM ogrenciler";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log("Result: ", result);
    }
  })
}

const findByID = (id) => {
  const query = "SELECT * FROM ogrenciler WHERE id = ?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log("Result: ", result);
    }
  })
}

const findByName = (name) => {
  const query = "SELECT * FROM ogrenciler WHERE ad = ?";
  connection.query(query, [name], (err, result) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log("Result: ", result);
    }
  })
}

const findByNameWithId = (id, name) => {
  const query = "SELECT * FROM ogrenciler WHERE id = ? and ad = ?";
  connection.query(query, [id, name], (err, result) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log("Result: ", result);
    }
  })
}

const findByNameOrSurname = (name, surname) => {
  const query = "SELECT * FROM ogrenciler WHERE ad = ? or soyad = ?";
  connection.query(query, [name, surname], (err, result) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log("Result: ", result);
    }
  })
}

const deleteByID = (id) => {
  const query = "DELETE FROM ogrenciler WHERE id = ?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log("Result: ", result);
    }
  })
}

const deleteBySurname = (surname) => {
  const query = "DELETE FROM ogrenciler WHERE soyad = ?";
  connection.query(query, [surname], (err, result) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log("Result: ", result);
    }
  })
}

connection.connect((err) => {
  if (err) {
    console.log("hata", err);
  }

  console.log("baglanti kuruldu");

  // createDB();
  // createTable();
  // createRecord();
  // createMultibleRecords();
  // createDynamicRecord();

  // selectMyData();
  // findByID(11);
  // findByID(4);
  // findByID(2);

  // findByName("Ahmet");
  // findByName("Mustafa");

  // findByNameWithId(4, "Ahmet");
  // findByNameOrSurname("Ahmet", "Koç");
  // deleteByID(9);

  selectMyData();
  deleteBySurname("Koç");
  selectMyData();
});

