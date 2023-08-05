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

  static async findmonth(req, res) {
    try {
      const month = req.params.month;
      const year = req.params.year;
      
      const foundMonth = await Month.findOne({ where: { month, year } });

      if (!foundMonth) {
        return res.sendStatus(404);
      }
      res.status(201).send(foundMonth);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
}

module.exports = MonthController;
