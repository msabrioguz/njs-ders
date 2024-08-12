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

  const socialMedia = await Social.create({
    name: "Twitter",
  });
  const userWithSocialMedia = await user.addSocial(socialMedia);

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

const pluralize = async () => {
  const plura = require("pluralize");

  const data = plura("SocialMedia");
  console.log(data);
};

const getUserSocials = async () => {
  const user = await User.findByPk(3);
  const data = await user.getSocials();

  console.log("data", data);
};

const getUserSocialsCount = async () => {
  const user = await User.findByPk(3);
  const data = await user.countSocials();

  console.log("Sosyal medya sayısı:", data);
};

const multipleSocialMedias = async () => {
  const user = await User.findByPk(6);
  const social = await Social.create({ name: 'Facebook'});
  const social2 = await Social.create({ name: 'Youtube'});

  const result = await user.addSocials([social, social2]);

  console.log("Result: ", result);
}

// İşlemler
if (!db.force) {
  // createDataWithRelational();
  // createData();
  // createData1();
  // pluralize();
  // getUserSocials();
  // getUserSocialsCount();
  multipleSocialMedias();
}
