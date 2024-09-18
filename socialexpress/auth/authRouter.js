const express = require('express');
const { login, signUp } = require('./authController');

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/signup', signUp);

module.exports = { authRouter };