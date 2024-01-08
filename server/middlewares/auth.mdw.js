const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    if (!token) {
      return res.status(400).json({
        msg: 'Missing token',
      });
    }

    const KEY = process.env.PRIVATE_KEY;

    jwt.verify(token, KEY, (err, decode) => {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          return res.status(400).json({
            msg: 'Token is expired!',
          });
        } else {
          return res.status(500).json({
            msg: 'Failed to authenticate token',
          });
        }
      }

      req.decode = decode;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
      stack: error.stack,
    });
  }
};

module.exports = authMiddleware;