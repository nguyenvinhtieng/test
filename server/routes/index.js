const express = require('express')
const router = express.Router()
// const signUpRouter = require('./auth.route');
const logInRouter = require('./auth.route');


router.use('/api', logInRouter)
// router.use('/signup', signUpRouter)


module.exports = router;