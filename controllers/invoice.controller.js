const { Invoice, Month } = require("../models/index");
const functionmonth = require("../utils/month");
const { Op, Sequelize } = require("sequelize");

class InvoiceController {
  static async createInvoice(req, res) {
    try {
      const { paymentdate, ivaAlicuota, total, montoSinIva } = req.body;

      const month = parseInt(paymentdate.split("-")[1], 10);
      const year = parseInt(paymentdate.split("-")[0], 10);
      // Extracts the month from the paymentdate (e.g., "07" for "2023-07-25")

      const invoice = await Invoice.create(req.body);

      const findMonth = await Month.findOne({ where: { month, year } });
      console.log("invoice", invoice);

      if (invoice.type === "Transferencia") {
        findMonth.creditcardexpenses = findMonth.creditcardexpenses + total;
      } else if (invoice.type === "Efectivo") {
        findMonth.cashexpenses = findMonth.cashexpenses + total;
      }
      findMonth.iva = findMonth.iva + total - montoSinIva;
      findMonth.save();

      res.status(201).send({ invoice, findMonth });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
  static async findInvoices(req, res) {
    try {
      const year = req.params.year;

      const invoices = await Invoice.findAll();

      const filteredInvoices = invoices.filter((invoice) => {
        const invoiceYear = new Date(invoice.paymentdate).getFullYear();
        return invoiceYear.toString() === year; // Convertimos el year a string antes de comparar
      });

      const invoicesWithMes = filteredInvoices.map((invoice) => {
        const {
          id,
          paymentdate,
          category,
          type,
          ivaAlicuota,
          montoSinIva,
          detail,
          total,
        } = invoice;

        const mes = invoice.mes;
        const montoSinIvaRedondeado = parseFloat(montoSinIva).toFixed(2);
        const totalRedondeado = parseFloat(Math.round(total));
        console.log("total", totalRedondeado);

        return {
          id,
          paymentdate,
          category,
          type,
          ivaAlicuota,
          montoSinIva: montoSinIvaRedondeado,

          detail,
          total: totalRedondeado,
          mes,
        };
      });

      res.status(200).json(invoicesWithMes);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  static async findInvoicesCategoryPerMonth(req, res) {
    try {
      const { nameCategory, month, type } = req.params;
      console.log("params", nameCategory, month, type);
      const monthNumberParam = functionmonth(month);

      if (type == "null" && nameCategory == "null") {
        const invoices = await Invoice.findAll({
          order: [["paymentdate", "Desc"]],
        });
        const invoicesForMonth = invoices.filter((invoice) => {
          return invoice.mes == monthNumberParam;
        });
        return res.status(200).send(invoicesForMonth);
      }

      if (type == "null") {
        const invoices = await Invoice.findAll({
          where: {
            category: nameCategory,
          },
          order: [["paymentdate", "Desc"]],
        });
        console.log("Julio", invoices);
        const invoicesForMonth = invoices.filter((invoice) => {
          console.log("invoice", invoice.mes, monthNumberParam);
          return invoice.mes == monthNumberParam;
        });
        console.log("invoicesforMONTH", invoicesForMonth);
        return res.status(200).send(invoicesForMonth);
      } else if (nameCategory == "null") {
        const invoices = await Invoice.findAll({
          where: {
            type: type,
          },
          order: [["paymentdate", "Desc"]],
        });
        const invoicesForMonth = invoices.filter((invoice) => {
          return invoice.mes == monthNumberParam;
        });
        return res.status(200).send(invoicesForMonth);
      }
      const invoices = await Invoice.findAll({
        where: {
          category: nameCategory,
          type: type,
        },
        order: [["paymentdate", "Desc"]],
      });
      const invoicesForMonth = invoices.filter((invoice) => {
        return invoice.mes == monthNumberParam;
      });
      return res.status(200).send(invoicesForMonth);
    } catch (error) {
      console.log("error", error);
      res.sendStatus(500);
    }
  }
  static async deleteInvoice(req, res) {
    const id = req.params.id;

    try {
      const invoiceToDelete = await Invoice.findOne({
        where: { id: id },
      });
      if (!invoiceToDelete) {
        return res.status(404).json({ message: "Invoice not found" });
      }
      const isoStringMonth = invoiceToDelete.paymentdate.toISOString();
      const month = parseInt(
        isoStringMonth.charAt(5) + isoStringMonth.charAt(6),
        10
      ).toString();
      const date = new Date(invoiceToDelete.paymentdate);
      const year = date.getFullYear().toString(); // Obtener el año y convertirlo a cadena

      const findMonth = await Month.findOne({ where: { month, year } });

      if (invoiceToDelete.type === "Transferencia") {
        findMonth.creditcardexpenses =
          findMonth.creditcardexpenses - invoiceToDelete.total;
      } else if (invoiceToDelete.type === "Efectivo") {
        findMonth.cashexpenses = findMonth.cashexpenses - invoiceToDelete.total;
      }
      findMonth.iva =
        findMonth.iva - (invoiceToDelete.total - invoiceToDelete.montoSinIva);
      findMonth.save();

      await invoiceToDelete.destroy();

      return res.status(204).send("nada"); // Devuelve una respuesta exitosa sin contenido
    } catch (error) {
      console.log("error", error);
    }
  }
}

module.exports = InvoiceController;
