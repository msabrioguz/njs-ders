const db = require("./models");
const User = require("./models").user;

db.sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
    console.log(User);
    User.create({
      username: "Msoguz",
      first_name: "Mustafa",
      last_name: "Oguz",
      email: "H9fD0@example.com",
      password: "12345",
      status: true,
    }).then((data) => {
      console.log(data);
    });
  })
  .catch((err) => {
    console.log("Error: " + err.message);
  });
