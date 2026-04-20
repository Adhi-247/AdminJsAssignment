const bcrypt = require('bcrypt');
const { User } = require('../models');
const { signToken } = require('../utils/jwt');

async function loginUser({ email, password }) {
  if (!email || !password) {
    const error = new Error('Email and password are required');
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const token = signToken({ id: user.id, email: user.email, role: user.role });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

module.exports = { loginUser };
