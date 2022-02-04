'use strict'
const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth');
const router = express.Router();

router.post('/login', authController.login);
router.post('/signup',
    body('email')
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email."),
    body('password')
        .trim()
        .isLength({ min: 6 }), authController.signUp);

module.exports = router;