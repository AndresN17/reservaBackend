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