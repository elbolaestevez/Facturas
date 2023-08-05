const { Router } = require("express");
const MonthController = require("../controllers/month.controller");

const monthRouter = Router();

monthRouter.post("/create", MonthController.createmonth);
monthRouter.get("/", MonthController.findmonths);
monthRouter.get("/:month/:year", MonthController.findmonth);

module.exports = monthRouter;
