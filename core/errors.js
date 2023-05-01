const httpStatus = require('http-status');

class ObjectDoesNotExist extends Error {
  constructor(message) {
    super(message);
    this.code = httpStatus.NOT_FOUND;
  }
}

module.exports = ObjectDoesNotExist;
