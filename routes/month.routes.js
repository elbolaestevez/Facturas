const { Router } = require("express");
const MonthController = require("../controllers/month.controller");

const monthRouter = Router();

monthRouter.post("/create", MonthController.createmonth);
monthRouter.get("/", MonthController.findmonths);

module.exports = monthRouter;