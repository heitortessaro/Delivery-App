const { CustomError } = require('../helpers/customError');
const { token } = require('../helpers/token');
const { user } = require('../database/models');

class TokenValidation {
  constructor(userModel = user) {
    this.userModel = userModel;
  }

  async validate(req, _res, next) {
    const userToken = req.headers.authorization;

    if (!userToken) throw new CustomError(404, 'Token not found');

    const { data } = token.verify(userToken);

    if (!data) throw new CustomError(400, 'Invalid token');

    const userInfo = await this.userModel
      .findOne({ where: { email: data.email, password: data.hashedPassword } });

    req.user = userInfo;

    return next();
  }
}

module.exports = {
  TokenValidation,
};