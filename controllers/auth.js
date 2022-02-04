'use strict'
const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Rol = require('../models/rol');

exports.signUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
    }

    let { email, userName, firstName, lastName, password, image, rolId } = req.body;
    try {
        const userExist = await User.findOne({ where: { email: email } });
        if (userExist) {
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
            image: image,
            rolId: rolId,
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

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            const error = new Error("wrong credentials");
            error.statusCode = 404;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error("wrong credentials");
            error.statusCode = 401;
            throw error;
        }
        const rol = await Rol.findByPk(user.rolId);
        let isAdmin = false;
        if (rol.name.toString() === "admin") {
            console.log("es admin");
            isAdmin = true;
        }
        const SECRET = process.env.SECRET;
        const token = jwt.sign({
            email: user.email,
            userId: user.id,
        }, SECRET, { expiresIn: '1h' });

        const expiresIn = 3600;

        res.status(200).json({ token: token, isAdmin: isAdmin, expiresIn: expiresIn, userId: user.id });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

