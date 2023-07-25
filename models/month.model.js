const S = require("sequelize");
const db = require("../db");

class Month extends S.Model {}

Month.init(
  {
    month: {
      type: S.INTEGER,
    },
    creditcardexpenses: {
      type: S.FLOAT,
    },
    cashexpenses: {
      type: S.FLOAT,
    },
    initialcash: {
      type: S.FLOAT,
    },

    finalcash: {
      type: S.FLOAT,
    },
    bankcash: {
      type: S.FLOAT,
    },
  },
  { sequelize: db, modelName: "month" }
);

module.exports = Month;
