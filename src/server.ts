import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import Joi from "joi";
import "express-async-errors";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  { id: 1, name: "Mercury" },
  { id: 2, name: "Venus" },
  { id: 3, name: "Earth" },
  { id: 4, name: "Mars" },
  { id: 5, name: "Jupiter" },
  { id: 6, name: "Saturn" },
  { id: 7, name: "Uranus" },
];

app.use(morgan("dev"));
app.use(express.json());

const planetSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
});

app.get("/api/planets", (_, res) => {
  res.status(200).json(planets);
});

app.get("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));
  res.status(200).json(planet);
});

app.post("/api/planets", (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const name = req.body.name;

  if (!id || !name) {
    return res
      .status(400)
      .json({ error: "Both 'id' and 'name' are required." });
  }

  const newPlanet = { id, name };
  const validateNewPlanet = planetSchema.validate(newPlanet);

  if (validateNewPlanet.error) {
    return res.status(400).json({ msg: validateNewPlanet.error });
  } else {
    planets = [...planets, newPlanet];
    res.status(201).json({ msg: "Planet created" });
  }
});

app.put("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

  console.log(planets);

  res.status(200).json({ msg: "The planet was updated!" });
});

app.delete("/api/planets/:id", (req, res) => {
  const { id } = req.params;

  planets = planets.filter((p) => p.id !== Number(id));

  res.status(200).json({ msg: "Planet deleted!" });
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
