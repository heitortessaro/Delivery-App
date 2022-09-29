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
  
  async addUser(name, email, password) {
    const hashedPassword = md5(password);
    const registeredUser = await this.userModel
      .findOne({ where: { email } });
    if (registeredUser) throw new CustomError(409, 'User already registered');
    const userToken = token.generate({ email, hashedPassword });
    await this.userModel
      .create({ name, email, password: hashedPassword, role: 'customer' });
    const newUser = await this.userModel
      .findOne({ where: { name, email, password: hashedPassword } });
    // newUser.token = userToken;
    // const userData = { ...newUser, token: userToken };
    const { id, name: nameSaved , email: emailSaved, role} = newUser;
    // console.log(id, nameSaved, email);
    const userData = {id, name:nameSaved, email:emailSaved, role, token: userToken};
    // console.log(userData);
    return { newUser: userData };
  }

  async getUsers() {
    const users = await this.userModel.findAll({ attributes: { exclude: 'password' } });
    return users;
  }
}

module.exports = {
  UserService,
};
