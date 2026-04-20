const jwt = require('jsonwebtoken');
const env = require('../config/env');

function signToken(payload) {
  return jwt.sign(payload, env.jwt.secret, { expiresIn: env.jwt.expiresIn });
}

module.exports = { signToken };
