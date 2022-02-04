'use strict'
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/user', userController.getUsers);
router.post('/user', userController.createUser);
router.put('/user', userController.updateUser);
router.delete('/user', userController.deleteUser);

module.exports = router;