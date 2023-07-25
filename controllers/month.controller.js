const { Month } = require("../models/index");

class MonthController {
  static async createmonth(req, res) {
    try {
      const month = await Month.create(req.body);
      res.status(201).send(month);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
  static async findmonths(_, res) {
    try {
      const months = await Month.findAll();
      res.status(201).send(months);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
}

module.exports = MonthController;
