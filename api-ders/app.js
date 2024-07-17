const express = require("express");

const app = express();
const router = express.Router();

app.use(express.json());

const data = [
  {
    id: 1,
    name: "Mustafa",
    age: 25,
  },
  {
    id: 2,
    name: "Oguz",
    age: 25,
  },

  {
    id: 3,
    name: "Merve",
    age: 25,
  },
];

router.get('/users', (req, res) => {
  res.status(200).json(data);
});

router.post('/user-create', (req, res) => {
  const { name, age } = req.body;
  const id = data.length + 1;
  data.push({ id, name, age });
  res.status(201).json(data);
});

router.delete('/user-delete/:id', (req, res) => {
  const { id } = req.params;
  data.splice(id - 1, 1);
  res.status(200).json(data);
});

router.put('/user-update/:id', (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  data[id - 1] = { id, name, age };
  res.status(200).json(data);
});

app.use(router);

app.listen(5000, () => console.log("server running"));
