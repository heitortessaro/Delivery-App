const md5 = require('md5');
const { user } = require('../database/models');
const { CustomError } = require('../helpers/customError');
const { token } = require('../helpers/token');

class UserService {
  constructor(userModel = user) {
    this.userModel = userModel;
  }

  async login(email, password) {
    const hashedPassword = md5(password);

    const usuario = await this.userModel.findOne({ where: { email, password: hashedPassword } });

    if (!usuario) throw new CustomError(404, 'User not found');

    const userToken = token.generate({ email, hashedPassword });

    const { name, role, id } = usuario;

    return {
      id,
      email,
      name,
      role,
      token: userToken,
    };
  }
}

module.exports = {
  UserService,
};