'use strict'
const User = require('../models/user');

exports.getUsers = async (req, res, next) => {
    try {
        let users = await User.findAll();
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

