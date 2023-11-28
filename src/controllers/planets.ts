import { Request, Response } from "express";
import Joi from "joi";

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

const planetSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
});

const getAll = (req: Request, res: Response) => {
  res.status(200).json(planets);
};

const getOneById = (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));

  if (!planet) {
    res.status(404).json('Planet not found');
  }

  res.status(200).json(planet);
};

const create = (req: Request, res: Response) => {
  const id = req.body.id;
  const name = req.body.name;

  if (!id || !name) {
    return res.status(400).json({ error: "Both 'id' and 'name' are required." });
  }

  const newPlanet = { id, name };
  const validateNewPlanet = planetSchema.validate(newPlanet);

  if (!validateNewPlanet) {
    return res.status(400).json({ msg: validateNewPlanet });
  } else {
    planets = [...planets, newPlanet];
    res.status(201).json({ msg: "Planet created" });
  }
};

const updateById = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

  res.status(200).json({ msg: "The planet was updated!" });
};

const deleteById = (req: Request, res: Response) => {
  const { id } = req.params;

  planets = planets.filter((p) => p.id !== Number(id));

  res.status(200).json({ msg: "Planet deleted!" });
};

export { getAll, getOneById, create, updateById, deleteById }
