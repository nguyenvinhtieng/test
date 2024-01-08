const express = require('express')
const router = express.Router()
const signUpRouter = require('./auth.route');
const logInRouter = require('./auth.route');


router.use('/signup', signUpRouter)
router.use('/login', logInRouter)


module.exports = router;