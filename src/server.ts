import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
} from "./controllers/planets";
import "express-async-errors";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(morgan("dev"));
app.use(express.json());

app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOneById);

app.post("/api/planets", create);

app.put("/api/planets/:id", updateById);

app.delete("/api/planets/:id", deleteById);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
