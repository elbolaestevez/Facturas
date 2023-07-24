const express = require("express");
const app = express();
const models = require("./models/index");

require("dotenv").config();

const db = require("./db/index");
app.use(express.json());

db.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log("server levantado en puerto 3001");
  });
});
