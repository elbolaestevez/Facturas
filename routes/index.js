const { Router } = require("express");

const userRoutes = require("./user.routes");
const invoiceRoutes = require("./invoice.routes");
const categoryRoutes = require("./category.routes");
const monthRoutes = require("../routes/month.routes");

const router = Router();

router.use("/user", userRoutes);
router.use("/invoice", invoiceRoutes);
router.use("/category", categoryRoutes);
router.use("/month", monthRoutes);

module.exports = router;
