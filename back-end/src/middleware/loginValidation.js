const { loginSchema } = require('../schemas/loginSchemas');
const { CustomError } = require('../helpers/customError');

class LoginValidation {
  constructor(schema = loginSchema) {
    this.schema = schema;
  }

  validate(req, _res, next) {
    const data = req.body;

    const validation = this.schema.safeParse(data);

    if (validation.success) return next();

    const { issues } = validation.error;

    const firstIssue = issues[0];

    throw new CustomError(400, firstIssue.message);
  }
}

const loginValidation = new LoginValidation(loginSchema);

module.exports = {
  loginValidation,
};