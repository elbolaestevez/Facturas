const { Invoice, Month } = require("../models/index");
const functionmonth = require("../utils/month");
const { Op, Sequelize } = require("sequelize");

class InvoiceController {
  static async createInvoice(req, res) {
    try {
      const { paymentdate, category, ivaAlicuota, detail, total } = req.body;

      const month = parseInt(paymentdate.split("-")[1], 10); // Extracts the month from the paymentdate (e.g., "07" for "2023-07-25")

      const invoice = await Invoice.create(req.body);

      const findMonth = await Month.findOne({ where: { month } });

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
      const { nameCategory, month, type } = req.params;
      const monthNumberParam = functionmonth(month);

      if (type == "null") {
        const invoices = await Invoice.findAll({
          where: {
            category: nameCategory,
          },
        });
        const invoicesForMonth = invoices.filter((invoice) => {
          return invoice.mes === monthNumberParam;
        });

        return res.status(200).send(invoicesForMonth);
      } else if (nameCategory == "null") {
        const invoices = await Invoice.findAll({
          where: {
            type: type,
          },
        });
        const invoicesForMonth = invoices.filter((invoice) => {
          return invoice.mes === monthNumberParam;
        });
        return res.status(200).send(invoicesForMonth);
      }
      const invoices = await Invoice.findAll({
        where: {
          category: nameCategory,
          type: type,
        },
      });
      const invoicesForMonth = invoices.filter((invoice) => {
        return invoice.mes === monthNumberParam;
      });
      return res.status(200).send(invoicesForMonth);
    } catch (error) {
      console.log("error", error);
      res.sendStatus(500);
    }
  }
}

module.exports = InvoiceController;
