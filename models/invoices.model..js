const S = require("sequelize");
const db = require("../db");

class Invoice extends S.Model {
  get mes() {
    const isoString = this.paymentdate.toISOString();
    const month = parseInt(
      isoString.charAt(5) + isoString.charAt(6),
      10
    ).toString();

    return month;
  }
}

Invoice.init(
  {
    paymentdate: {
      type: S.DATE,
      allowNull: false,
    },
    category: {
      type: S.STRING,
      allowNull: false,
    },
    type: {
      type: S.STRING,
    },
    ivaAlicuota: {
      type: S.FLOAT,
    },
    montoSinIva: {
      type: S.FLOAT,
    },
    detail: {
      type: S.TEXT,
    },
    total: {
      type: S.FLOAT,
    },
  },
  { sequelize: db, modelName: "invoice", getters: true }
);

module.exports = Invoice;
