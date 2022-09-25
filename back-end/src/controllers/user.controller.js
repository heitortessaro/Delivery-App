const { UserService } = require('../services/user.service');

class UserController {
  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  async login(req, res) {
    const { email, password } = req.body;

    const user = await this.userService.login(email, password);

    res.status(200).json(user);
  }

  async addUser(req, res) {
    const { name, email, password } = req.body;
    const { newUser, message } = await this.userService.addUser(name, email, password);
    res.status(201).json({ message, newUser });
  }
}

module.exports = {
  UserController,
};