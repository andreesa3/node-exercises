const express = require('express');
const morgan = require("morgan");
const multer = require("multer");
const { getAll, getOneById, create, updateById, deleteById, createImage } = require('./controllers/planets');
const { logIn, signUp, logOut } = require('./controllers/users');
const authorize = require('./authorize');
const passport = require('./passport');
require('dotenv').config();


const { PORT } = process.env;

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(morgan("dev"));
app.use(express.json());

app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOneById);

app.post("/api/planets", create);

app.put("/api/planets/:id", updateById);

app.delete("/api/planets/:id", deleteById);

app.post(
  "/api/planets/:id/image",
  upload.single("image"),
  createImage
);

app.post('/api/users/login', logIn);
app.post('/api/users/signup', signUp);
app.get('/api/users/logout', authorize, logOut);

app.use("/uploads", express.static("uploads"));

app.use("/static", express.static("static"));

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
