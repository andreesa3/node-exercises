import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import "express-async-errors";

const app = express();
const port = 3000;

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
  { id: 8, name: "Neptune" },
];

app.use(morgan("dev"));

app.get("/", (_, res) => {
  res.status(200).json(planets);
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
