'use strict'
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/user', userController.getUsers);

module.exports = router;