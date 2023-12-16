const Joi = require('joi');
const db = require('../db');

const getAll = async (_, res) => {
  const planets = await db.many(`SELECT * FROM planets;`);
  res.status(200).json(planets);
};

const getOneById = async (req, res) => {
  const { id } = req.params;
  const planet = await db.oneOrNone(
    `SELECT * FROM planets WHERE id=$1;`,
    Number(id)
  );
  res.status(200).json(planet);
};

const planetSchema = Joi.object({
  name: Joi.string().required(),
});

const create = async (req, res) => {
  const { name } = req.body;
  const newPlanet = { name };
  const validateNewPlanet = planetSchema.validate(newPlanet);

  if (validateNewPlanet.error) {
    return res.status(400).json({ error: "name is required." });
  } else {
    await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
    res.status(201).json({ msg: "Planet created" });
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name]);

  res.status(200).json({ msg: "The planet was updated!" });
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  await db.none(`DELETE FROM planets WHERE id=$1`, id);

  res.status(200).json({ msg: "Planet deleted!" });
};


const createImage = async (req, res) => {
  const { id } = req.params;
  const fileName = req.file?.path;
  if (fileName) {
    db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, fileName]);
    res.status(201).json({ msg: "Planet image uploaded successfully." });
  } else {
    res.status(400).json({ msg: "Planet image failed to upload." });
  }
}

module.exports = {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  createImage
}
