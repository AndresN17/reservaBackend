'use strict'
const sequelize = require('../utils/database');
const Sequelize = require('sequelize');


const User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    enable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    image: {
        type: Sequelize.STRING,
    }
});

module.exports = User;