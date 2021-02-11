const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const router = require("./Routes");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  
    next();
});

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  });

app.use("/", router);

app.listen(PORT, () => {
  console.log("Server started at PORT", PORT);
});
