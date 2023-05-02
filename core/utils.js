const { ObjectDoesNotExist } = require('./errors');

const getObjectOrRaise404 = async (Model, id) => {
  const obj = await Model.findById(id);
  if (!obj) {
    throw new ObjectDoesNotExist(`'${Model.modelName}' c id ${id} не найден`);
  }
  return obj;
};

module.exports = {
  getObjectOrRaise404,
};
