const { Op, QueryTypes } = require("sequelize");
const db = require("./db");
const Social = require("./models/social-model");
const User = require("./models/user-model");

const connectToDb = async () => {
  await db.connect();
  await db.createTables();
};

// Uygulama Başlatılıyor.
connectToDb();

const createDataWithRelational = async () => {
  const user = await User.create({
    username: "Msoguz",
  });

  const socialMedia = await SocialMedia.create({
    name: "Twitter",
  });
  const userWithSocialMedia = await user.addSocialMedia(socialMedia);

  console.log("userWithSocial", userWithSocialMedia);
};

const createData = async () => {
  const user = await User.create({
    username: "Polat",
  });
  const a = await user.createSocial({
    name: "Twitter",
  });

  console.log("user:", a);
};

const createData1 = async () => {
  const user = await User.findByPk(3);
  const a = await user.createSocial({
    name: "Linkedin",
  });

  console.log("user:", a);
};

const pluralize = async() => {
  const plura = require('pluralize');

  const data = plura('SocialMedia');
  console.log(data);
}
// İşlemler
if (!db.force) {
  // createDataWithRelational();
  // createData();
  // createData1();
  // pluralize();
}
