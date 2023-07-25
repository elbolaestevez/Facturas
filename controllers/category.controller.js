const { Category } = require("../models/index");

class CategoryController {
  static async createCategory(req, res) {
    try {
      const category = await Category.create(req.body);
      res.status(201).send(category);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
  static async findCategories(req, res) {
    try {
      const categories = await Category.findAll();
      res.status(201).send(categories);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
}

module.exports = CategoryController;
