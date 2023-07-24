const S = require("sequelize");

class Invoice extends S.Model {}

Invoice.init(
  {
    paymentdate: {
      type: S.DATE,
      allowNull: false,
    },
    category: {
      type: S.STRING,
    },
    iva: {
      type: S.NUMBER,
    },
    detail: {
      type: S.TEXT,
    },
    total: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "invoice" }
);

module.exports = Invoice;
