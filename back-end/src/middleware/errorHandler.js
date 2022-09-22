const { CustomError } = require('../helpers/customError');

class ErrorHandler {
  constructor(defaultStatusCode = 500) {
    this.defaultStatusCode = defaultStatusCode;
  }

  handle(error, _req, res, _next) {
    if (error instanceof CustomError) {
      return res.status(error.status).json({ message: error.message });
    }

    const errorStatus = error.status || this.defaultStatus;

    return res
      .status(errorStatus)
      .json({ message: error.message });
  }
}

const errorHandler = new ErrorHandler();

module.exports = {
  errorHandler,
};