const { Router } = require("express");
const InvoiceController = require("../controllers/invoice.controller");

const invoiceRouter = Router();

invoiceRouter.post("/create", InvoiceController.createInvoice);
invoiceRouter.get("/", InvoiceController.findInvoices);
invoiceRouter.get(
  "/category/:nameCategory/:month/:type",
  InvoiceController.findInvoicesCategoryPerMonth
);

module.exports = invoiceRouter;
