const { Router } = require("express");
const InvoiceController = require("../controllers/invoice.controller");

const invoiceRouter = Router();

invoiceRouter.post("/create", InvoiceController.createInvoice);
invoiceRouter.get("/year/:year", InvoiceController.findInvoices);
invoiceRouter.get(
  "/category/:nameCategory/:month/:type",
  InvoiceController.findInvoicesCategoryPerMonth
);
invoiceRouter.delete("/:id", InvoiceController.deleteInvoice);

module.exports = invoiceRouter;
