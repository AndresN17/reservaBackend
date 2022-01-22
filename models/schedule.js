'use strict'
const sequelize = require('../utils/database');
const Sequelize = require('sequelize');

const Schedule = sequelize.define('', {
    fromDay: {
        type: Sequelize.STRING,
    },
    toDay: {
        type: Sequelize.STRING,
    },
    fromHour: {
        type: Sequelize.STRING,
    },
    toHour: {
        type: Sequelize.STRING,
    }
});

module.exports = Schedule;