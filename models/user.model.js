const S = require("sequelize");
const db = require("../db");
const { hash, genSaltSync } = require("bcrypt");

class User extends S.Model {
  hash(password, salt) {
    return hash(password, salt);
  }

  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}

User.init(
  {
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "user" }
);
User.beforeCreate((user) => {
  const salt = genSaltSync();

  user.salt = salt;

  return user.hash(user.password, salt).then((hash) => {
    user.password = hash;
  });
});
module.exports = User;
