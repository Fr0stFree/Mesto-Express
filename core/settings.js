module.exports = {
  TOKEN_EXPIRATION: '1d',
  SECRET_KEY: process.env.SECRET_KEY,
  MONGO_DNS: process.env.MONGO_DNS || 'mongodb://localhost:27017/yandex-local',
  SERVER_PORT: process.env.SERVER_PORT || 3000,
};
