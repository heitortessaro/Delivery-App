const jwt = require('jsonwebtoken');
const { FileSystem } = require('./fileSystem');

class Token {
  constructor(secret = FileSystem.read()) {
    this.secret = secret;
  }

  generate(data) {
    const token = jwt.sign({ data }, this.secret);
    return token;
  }

  verify(token) {
    const data = jwt.verify(token, this.secret);

    return data;
  }
}

const token = new Token();

module.exports = {
  token,
};
