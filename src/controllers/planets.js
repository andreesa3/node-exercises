let planets = [
  { id: 1, name: "Mercury" },
  { id: 2, name: "Venus" },
  { id: 3, name: "Earth" },
  { id: 4, name: "Mars" },
  { id: 5, name: "Jupiter" },
  { id: 6, name: "Saturn" },
  { id: 7, name: "Uranus" },
];

const getAll = (req, res) => {
  res.status(200).json(planets);
};

const getOneById = (req, res) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));

  if (!planet) {
    res.status(404).json("Planet not found");
  }

  res.status(200).json(planet);
};

const create = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;

  if (!id || !name) {
    return res
      .status(400)
      .json({ error: "Both 'id' and 'name' are required." });
  }

  const newPlanet = { id, name };
  planets = [...planets, newPlanet];
  res.status(201).json({ msg: "Planet created" });
};

const updateById = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

  res.status(200).json({ msg: "The planet was updated!" });
};

const deleteById = (req, res) => {
  const { id } = req.params;

  planets = planets.filter((p) => p.id !== Number(id));

  res.status(200).json({ msg: "Planet deleted!" });
};

module.exports = {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById
}
