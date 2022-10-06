const { updateSaleStatusSchema } = require('../schemas/updateSaleStatusSchema');
const { CustomError } = require('../helpers/customError');

class UpdateSaleValidation {
  constructor(schema = updateSaleStatusSchema) {
    this.schema = schema;
  }

  validate(req, _res, next) {
    const data = req.body;
    console.log(data);

    const validation = this.schema.safeParse(data);

    if (validation.success) return next();

    const { issues } = validation.error;

    const errorMessage = issues[0].message;

    throw new CustomError(400, errorMessage);
  }
}

const updateSaleValidation = new UpdateSaleValidation(updateSaleStatusSchema);

module.exports = {
  updateSaleValidation,
};