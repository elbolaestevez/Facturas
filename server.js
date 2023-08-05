const express = require("express");
const app = express();
const models = require("./models/index");
const router = require("./routes");
const cors = require("cors");

require("dotenv").config();

const db = require("./db/index");
app.use(express.json());
app.use(cors(["http://localhost:3000"]));

app.use("/api", router);

db.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log("server levantado en puerto 3001");
  });
});
