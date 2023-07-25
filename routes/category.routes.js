const { Router } = require("express");
const CategoryController = require("../controllers/category.controller");

const cateogoryRouter = Router();

cateogoryRouter.post("/create", CategoryController.createCategory);
cateogoryRouter.get("/", CategoryController.findCategories);

module.exports = cateogoryRouter;
