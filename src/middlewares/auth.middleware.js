const jwt = require('jsonwebtoken');
const env = require('../config/env');

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.jwt.secret);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = { authMiddleware };
