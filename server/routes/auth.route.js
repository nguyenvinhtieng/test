const express = require('express');
const router = express.Router();

const { login, signup, verify, signOut } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.mdw');

// Sign up
router.post('/sign-up', signup);

// Login
router.post('/login', login);

// // Sign out
// router.put('/sign-out', signOut);

// // Verify
// router.put('/verify', authMiddleware, verify);

module.exports = router;