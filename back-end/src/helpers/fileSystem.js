const fs = require('fs');

class FileSystem {
  static read() {
    return fs.readFileSync('jwt.evaluation.key', 'utf8');
  }
}

module.exports = {
  FileSystem,
};