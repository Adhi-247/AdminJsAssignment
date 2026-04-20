const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

async function hashPassword(rawPassword) {
  return bcrypt.hash(rawPassword, SALT_ROUNDS);
}

module.exports = { hashPassword };
