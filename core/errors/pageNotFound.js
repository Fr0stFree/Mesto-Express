const { NOT_FOUND } = require('http-status');

module.exports = class PageNotFound extends Error {
  constructor(message) {
    super(message);
    this.message = message || 'Page has not been found';
    this.statusCode = NOT_FOUND;
  }
};
