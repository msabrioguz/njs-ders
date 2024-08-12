const { Op, QueryTypes } = require("sequelize");
const db = require("./db");
const SocialModel = require("./models/social-model");
const User = require("./models/user-model");
const SocialMedia = require("./models/social-model");

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

  const socialMedia = await SocialModel.create({
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
  const user = await User.findByPk(1);
  const a = await user.createSocial({
    name: "Youtube",
  });

  console.log("user:", a);
};

const pluralize = async () => {
  const plura = require("pluralize");

  const data = plura("SocialMedia");
  console.log(data);
};

const getUserSocials = async () => {
  const user = await User.findByPk(1);
  const data = await user.getSocials();

  data.forEach((element) => {
    console.log("Data:", element.name);
  });
};

const getUserSocialsCount = async () => {
  const user = await User.findByPk(1);
  const data = await user.countSocials();

  console.log("Sosyal medya sayısı:", data);
};

const multipleSocialMedias = async () => {
  const user = await User.findByPk(1);
  const social = await SocialMedia.create({ name: "Facebook" });
  const social2 = await SocialMedia.create({ name: "Pinterest" });

  const result = await user.addSocials([social, social2]);

  console.log("Result: ", result);
};

const deleteData = async () => {
  const user = await User.findByPk(1);
  const socialMedia1 = await SocialMedia.findByPk(3);
  const socialMedia2 = await SocialMedia.findByPk(4);
  const result = await user.removeSocials([socialMedia1, socialMedia2]);

  console.log("Result: ", result);
};

const deleteSingleData = async () => {
  const user = await User.findByPk(1);
  const social = await SocialMedia.findByPk(1);
  const result = await user.removeSocial(social);

  console.log("Result: ", result);
};

const listData = async () => {
  const data = await User.findAll({
    include: Socials,
  });
  console.log(data);
};

// İşlemler
if (!db.force) {
  // createDataWithRelational();
  // createData();
  // createData1();
  // pluralize();
  // getUserSocials();
  // getUserSocialsCount();
  // multipleSocialMedias();
  // deleteSingleData();
  // deleteData();
  listData();
}
