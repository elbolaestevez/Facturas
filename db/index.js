// const Sequelize = require("sequelize");
// require("dotenv").config();

// const db = new Sequelize(process.env.DATABASE_URL, {
//   dialect: "postgres",
//   logging: false,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false, // You may need to set this to false or true based on the PostgreSQL server's SSL configuration
//     },
//   },
// });

// module.exports = db;

const Sequelize = require("sequelize");

const db = new Sequelize("gastosterrazas", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
