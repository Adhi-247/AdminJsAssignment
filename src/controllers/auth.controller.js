const { loginUser } = require('../services/auth.service');

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });

    res.cookie('token', result.token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: 'Login successful',
      ...result,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { login };
