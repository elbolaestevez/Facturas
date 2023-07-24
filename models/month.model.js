const S = require("sequelize");

class Month extends S.Model {}

Month.init(
  {
    month: {
      type: S.STRING,
    },
    creditcardexpenses: {
      type: S.NUMBER,
    },
    cashexpenses: {
      type: S.NUMBER,
    },
    initialcash: {
      type: S.NUMBER,
    },
    finalcash: {
      type: S.NUMBER,
    },
    bankcash: {
      type: S.NUMBER,
    },
  },
  { sequelize: db, modelName: "month" }
);

module.exports = Month;
