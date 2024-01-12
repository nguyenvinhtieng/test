const { User } = require('./../models/user');
const jwt = require('jsonwebtoken');
const { findUsersBy, insertUser, updateUserBy } = require('../services/user.service');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({
      msg: 'Missing required keys',
    });
  }

  const existingUser = await findUsersBy({ filters: { username } });

  if (!existingUser || existingUser.length === 0) {
    return res.status(404).json({
      msg: 'Username is wrong!',
    });
  }

  const isTheSame = await bcrypt.compare(password, existingUser[0].password);
  if (!isTheSame) {
    return res.status(404).json({
      msg: 'Password is wrong!',
    });
  }

  const payload = {
    username: existingUser[0].username,
    fname: existingUser[0].fname,
    role: existingUser[0].role,
  };

  const KEY = process.env.PRIVATE_KEY;
  const EXPIRED_TIME = process.env.EXPIRED_TIME;

  const token = jwt.sign(payload, KEY, { expiresIn: EXPIRED_TIME });

  return res.json({
    msg: 'Login successfully!',
    token,
  });
};

const signup = async (req, res) => {
  const { username, fname, gender = 0, password } = req.body || {};

  if (!username || !fname || !password) {
    return res.status(400).json({
      msg: 'Missing required keys',
    });
  }

  const existingUser = await findUsersBy({ filters: { username } });

  if (existingUser && existingUser.length > 0) {
    if (existingUser[0].isActive) {
      return res.status(400).json({
        msg: 'Username is already taken',
      });
    }
  } else {
    const saltRound = 10;
    const genSalt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, genSalt);

    await insertUser({ username, fname, gender, password: hash });
  }

  const payload = {
    username: username,
  };

  const KEY = process.env.PRIVATE_KEY;
  const EXPIRED_TIME = process.env.EXPIRED_TIME;

  const token = jwt.sign(payload, KEY, { expiresIn: EXPIRED_TIME });

  return res.status(201).json({
    msg: 'Signup successfully!',
    token,
  });
};

const verify = async (req, res) => {
  const { decode } = req;

  if (decode) {
    const { username } = decode;
    const existingUser = await findUsersBy({ filters: { username } });

    if (existingUser && existingUser.length > 0) {
      const { isActive } = existingUser[0];

      if (isActive) {
        return res.status(200).json({
          msg: 'User is active',
        });
      } else {
        await updateUserBy({ isActive: true }, { username });
        return res.status(200).json({
          msg: 'Verified successfully!',
        });
      }
    } else {
      return res.status(404).json({
        msg: 'User is not found! Register please!',
      });
    }
  } else {
    return res.status(400).json({
      msg: 'Token is invalid!',
    });
  }
};

const signout = (req, res) => {
  return res.json({
    msg: 'signout successful!',
  });
};

module.exports = {
  login,
  signup,
  verify,
  signout,
};