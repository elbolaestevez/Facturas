const { User } = require("../models/index");

class UserController {
  static async createUser(req, res) {
    User.create(req.body)
      .then((usuario) => res.status(201).send(usuario))
      .catch((error) => console.log(error));
  }
  static async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).send("no encuentra email");
      }
      const isValid = await user.validatePassword(password);
      if (!isValid) {
        return res.send("usuario no coincide");
      }
      return res.send(isValid);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
}

module.exports = UserController;
