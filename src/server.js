const express = require('express');
const morgan = require("morgan");
const { getAll, getOneById, create, updateById, deleteById } = require('./controllers/planets');

const app = express();
const port = 3080;

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
