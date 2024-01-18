const { User } = require('./../models/user');
const jwt = require('jsonwebtoken');
// const { findUsersBy, insertUser, updateUserBy } = require('../services/user.service');
const bcrypt = require('bcrypt');
// const User = require('../models/user');
const login = async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({
      msg: 'Missing required keys',
    });
  }

  const existingUser = await User.findOne({ username });

  if(!existingUser) {
    return res.status(404).json({
      msg: 'User is not found!',
    });
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);
  if(!isMatch) {
    return res.status(400).json({
      msg: 'Password is incorrect!',
    });
  }
  
  const token = jwt.sign(
    {
      id: existingUser._id,
    },
    'secret',
    { expiresIn: '1h' }
  );

  return res.json({
    msg: 'Login successfully!',
    token,
  });
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      msg: 'Missing required keys',
    });
  }

  const isExists = await User.findOne({ username: email });
  if (isExists) {
    return res.status(400).json({
      msg: 'Username is already taken',
    });
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
    username: email,
    password: passwordHash,
  });

  await newUser.save();

  return res.status(201).json({
    msg: 'Signup successfully!',
  });
};

// const verify = async (req, res) => {
//   const { decode } = req;

//   if (decode) {
//     const { username } = decode;
//     const existingUser = await findUsersBy({ filters: { username } });

//     if (existingUser && existingUser.length > 0) {
//       const { isActive } = existingUser[0];

//       if (isActive) {
//         return res.status(200).json({
//           msg: 'User is active',
//         });
//       } else {
//         await updateUserBy({ isActive: true }, { username });
//         return res.status(200).json({
//           msg: 'Verified successfully!',
//         });
//       }
//     } else {
//       return res.status(404).json({
//         msg: 'User is not found! Register please!',
//       });
//     }
//   } else {
//     return res.status(400).json({
//       msg: 'Token is invalid!',
//     });
//   }
// };

// const signout = (req, res) => {
//   return res.json({
//     msg: 'signout successful!',
//   });
// };

module.exports = {
  login,
  signup,
  // verify,
  // signout,
};