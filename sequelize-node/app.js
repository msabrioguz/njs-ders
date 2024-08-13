const express = require("express");
const app = express();
const router = express.Router();
const db = require("./db");
const SocialModel = require("./models/social-model");
const User = require("./models/user-model");
const SocialMedia = require("./models/social-model");

const connectToDb = async () => {
  await db.connect();
  await db.createTables();
};

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

router.get('/getDataList', async (req, res) => {
  try {
    const data = await User.findAll({
      include: SocialMedia,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
})

app.use(router);

app.listen(5000, async () => {
  console.log("Server started on port 5000\nServer: http://localhost:5000");
  await connectToDb();
});

