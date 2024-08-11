const { Op, QueryTypes } = require("sequelize");
const db = require("./db");
// const SocialMedia = require("./models/SocialMedia");
const User = require("./models/User");

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
  const socialMediaData = await user.createsocialMedia({ name: "Pinterest" });

  console.log("x", socialMediaData);
  // const socialMedia = await SocialMedia.create({
  //   name: "Twitter",
  // });
  // const userWithSocialMedia = await user.addSocialMedia(socialMedia);

  // console.log("userWithSocial", userWithSocialMedia);
};

// İşlemler
if (!db.force) {
  createDataWithRelational();
}
