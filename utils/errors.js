class ObjectDoesNotExist extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = {
  ObjectDoesNotExist,
}