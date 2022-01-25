'use strict'
const sequelize = require('../utils/database');
const Sequelize = require('sequelize');

const Local = sequelize.define('local', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    direction: {
        type: Sequelize.STRING,
    },
    costPerHour: {
        type: Sequelize.DOUBLE,

    },
    likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    city: {
        type: Sequelize.STRING,
    }
});

module.exports = Local;