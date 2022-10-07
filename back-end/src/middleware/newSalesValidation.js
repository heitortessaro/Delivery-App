const { newSaleSchema } = require('../schemas/newSaleSchema');
const { CustomError } = require('../helpers/customError');

class SaleValidation {
  constructor(schema = newSaleSchema) {
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

const saleValidation = new SaleValidation(newSaleSchema);

module.exports = {
  saleValidation,
};