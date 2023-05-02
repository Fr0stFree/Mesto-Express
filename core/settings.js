module.exports = {
  TOKEN_EXPIRATION: '7d',
  SECRET_KEY: process.env.SECRET_KEY || 'SOMETHING-REALLY-SECRET',
  MONGO_DNS: process.env.MONGO_DNS,
  SERVER_PORT: process.env.SERVER_PORT || 3000,
};
