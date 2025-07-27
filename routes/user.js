const express = require('express');
const router = express.Router();
const { handleUserSignUp, handleUserLogIn } = require('../controllers/user');
const User = require('../models/users');

router.post("/", handleUserSignUp);


router.post("/login", handleUserLogIn);

module.exports = router;