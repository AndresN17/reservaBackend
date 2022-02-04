'use strict'
const User = require('../models/user');
const Rol = require('../models/rol');
const bcrypt = require('bcryptjs');

exports.getUsers = async (req, res, next) => {
    try {
        let users = await User.findAll({
            include: Rol
        });
        if (!users) {
            const error = new Error("Users don't found");
            error.statusCode = 404;
            throw error;
        }
        users = users.map((user) => {
            delete user.dataValues.password;
            return user;
        });

        res.status(200).json({ users: users });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

exports.getUserById = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const userExist = await User.findByPk(userId);
        if (!userExist) {
            const error = new Error("User doesn't exist");
            error.statusCode = 404;
            throw error;
        }
        delete userExist.dataValues.password;
        res.status(200).json({ user: userExist });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.createUser = async (req, res, next) => {
    try {
        let { email, userName, firstName, lastName, image, rolId } = req.body;
        const userExist = await User.findOne({ where: { email: email } });
        if (userExist) {
            const error = new Error("User with this email already exist");
            error.statusCode = 404;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(userName, 13);
        const user = await User.create({
            email: email,
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
            image: image,
            rolId: rolId
        });

        res.status(201).json({ message: "User created succesfully.", user: user });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const userExist = await User.findByPk(userId);
        if (!userExist) {
            const error = new Error("User doesn't exist");
            error.statusCode = 404;
            throw error;
        }
        userExist.destroy();
        res.status(201).json({ message: "User deleted succesfully" });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

//Falta controlar lo de la imagen
exports.updateUser = async (req, res, next) => {
    try {
        const { userId, email, userName, firstName, lastName, image } = req.body;
        const userExist = await User.findByPk(userId);
        if (!userExist) {
            const error = new Error("User doesn't exist");
            error.statusCode = 404;
            throw error;
        }

        await userExist.update({
            email: email,
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            image: image
        });
        res.status(200).json({ message: " User updated succesfully." });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

