const express = require("express");
const app = express();
const router = express.Router();
const { Op } = require("sequelize");
const db = require("./db");
const SocialModel = require("./models/social-model");
const User = require("./models/user-model");
const SocialMedia = require("./models/social-model");
const Actor = require("./models/actor-model");
const Movie = require("./models/movie-model");

const connectToDb = async () => {
  await db.connect();
  await db.createTables();
};

app.use(express.json());
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

router.post("/createData", async (req, res) => {
  try {
    const { UserName, SocialName } = req.body;
    const data = await User.create({
      username: UserName,
    });
    data.createSocial({
      name: SocialName,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/createData/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { SocialName } = req.body;
    const data = await User.findByPk(id);
    data.createSocial({
      name: SocialName,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/getDataList", async (req, res) => {
  try {
    const data = await User.findAll({
      include: [
        {
          model: SocialMedia,
          attributes: ["name", "id"],
          where: {
            name: {
              [Op.in]: ["Twitter"],
            },
          },
        },
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/getDataList/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByPk(id, {
      attributes: ["id", "username"],
      include: {
        model: SocialMedia,
        attributes: ["name", "id"],
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

const test = async () => {
  const actor = await Actor.create({ name: "Tom Cruise" });
  const movie = await Movie.create({ name: "Top Gun" });

  const result = await actor.addMovie(movie);

  console.log("Result: ", result);
};

const test2 = async () => {
  const actor = await Actor.create({ name: "Johnny Depp" });
  const movie = await Movie.create({ name: "Deadpool" });

  const result = await movie.addActor(actor);

  console.log("Result: ", result);
};

const test3 = async () => {
  const actor = await Actor.findByPk(1);
  const movie = await Movie.create({ name: "Last Samurai" });

  const result = await movie.addActor(actor);

  console.log("Result: ", result);
};

const test4 = async () => {
  const actor = await Actor.findByPk(1);
  const movie1 = await Movie.create({ name: "Last Samurai" });
  const movie2 = await Movie.create({ name: "Tomorrow Never Dies" });

  const result = await actor.addMovies([movie1, movie2]);

  console.log("Result: ", result);
};



app.use(router);

app.listen(5000, async () => {
  console.log("Server started on port 5000\nServer: http://localhost:5000");
  await connectToDb();
  // test();
  // test2();
  // test4();
});
