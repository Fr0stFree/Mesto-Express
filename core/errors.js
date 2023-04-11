class ObjectDoesNotExist extends Error {
  constructor(message, model) {
    super(message);
    this.model = model;
  }
}

module.exports = ObjectDoesNotExist;
