'use strict'
const User = require('../models/user');
const { validationResult } = require('expess-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signIn = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
    }

    const { email, userName, firstName, lastName, password, image } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } });
        if (user) {
            const error = new Error('User with this email already exist.');
            error.statusCode = 400;
            throw error;
        }
        const hashedPassword = await bcrypt.hash(password, 13);
        const user = await User.create({
            email: email,
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
            image: image
        });
        res.status(201).json({
            message: 'user created succesfully.',
            user: {
                email: user.email,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

