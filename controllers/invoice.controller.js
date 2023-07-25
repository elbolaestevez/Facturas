const { Invoice, Month } = require("../models/index");
const functionmonth = require("../utils/month");
const { Op, Sequelize } = require("sequelize");

class InvoiceController {
  static async createInvoice(req, res) {
    try {
      const { paymentdate, category, ivaAlicuota, detail, total } = req.body;

      const month = parseInt(paymentdate.split("-")[1], 10); // Extracts the month from the paymentdate (e.g., "07" for "2023-07-25")

      const invoice = await Invoice.create(req.body);
      console.log("month", month);

      // Find the Month instance where the month matches the extracted month
      const findMonth = await Month.findOne({ where: { month } });
      console.log("findmonth", findMonth);

      if (invoice.type === "Transferencia") {
        findMonth.creditcardexpenses = findMonth.creditcardexpenses + total;
      } else if (invoice.type === "Efectivo") {
        findMonth.cashexpenses = findMonth.cashexpenses + total;
      }
      findMonth.save();

      res.status(201).send({ invoice, findMonth });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
  static async findInvoices(req, res) {
    try {
      const invoices = await Invoice.findAll();

      res.status(200).send(invoices);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
  static async findInvoicesCategoryPerMonth(req, res) {
    try {
      console.log("holaa");
      const { nameCategory, month } = req.params;
      const monthNumberParam = functionmonth(month);
      console.log("monthNumberParam", monthNumberParam);

      const invoices = await Invoice.findAll({
        where: {
          name: nameCategory,
          paymentDate: {
            [Op.and]: [
              Sequelize.where(
                Sequelize.fn("MONTH", Sequelize.col("paymentDate")),
                monthNumberParam
              ),
            ],
          },
        },
      });

      res.status(200).send(invoices);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
}

module.exports = InvoiceController;
