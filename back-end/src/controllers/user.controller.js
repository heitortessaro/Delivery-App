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
    const { name, email, password, role } = req.body;
    console.log(req.body);
    const { newUser, message } = await this.userService.addUser(name, email, password, role);
    res.status(201).json({ message, newUser });
  }

  async getUsers(_req, res) {
    const users = await this.userService.getUsers();
    res.status(200).json(users);
  }
}

module.exports = {
  UserController,
};