const { userRegisterSchema } = require('../schemas/userRegisterSchema');
const { CustomError } = require('../helpers/customError');

class UserRegisterValidation {
  constructor(schema = userRegisterSchema) {
    this.schema = schema;
  }

  validate(req, _res, next) {
    const data = req.body;

    const validation = this.schema.safeParse(data);

    if (validation.success) return next();

    const { issues } = validation.error;

    const errorMessage = issues[0].message;

    throw new CustomError(400, errorMessage);
  }
}

const userRegisterValidation = new UserRegisterValidation(userRegisterSchema);

module.exports = {
  userRegisterValidation,
};