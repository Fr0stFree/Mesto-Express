const dummyAuth = (req, res, next) => {
  req.user = {
    _id: '64346b1fd338a645625e4730' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
};

module.exports = {
  dummyAuth
};
