const express = require("express");

const app = express();
const router = express.Router();

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const myData = [
  {
    id: 1,
    team: "Beşiktaş",
  },
  {
    id: 2,
    team: "Fenerbahçe",
  },
  {
    id: 3,
    team: "Trabzonspor",
  },
  {
    id: 4,
    team: "Galatasaray",
  },
];

router.get("/list", (req, res) => {
  res.status(200).json(myData);
});

router.post("/create", (req, res) => {
  const { team } = req.body;
  const _team = { id: myData.length + 1, team };

  myData.push(_team);

  res.status(201).json(_team);
});

router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { team } = req.body;
  const index = myData.findIndex((item) => item.id == id);
  myData[index].team = team;
  res.status(200).json({ message: "updated", myData: myData });
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const index = myData.findIndex((item) => item.id == id);
  myData.splice(index, 1);
  res.status(200).json({ message: "deleted", myData: myData });
});

router.use("/my-api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(express.json());
app.use(router);

app.listen(5000, () => {
  console.log("Server started on port http://localhost:5000");
});
