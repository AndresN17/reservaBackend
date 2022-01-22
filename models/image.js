'use strict'

const sequelize = require('../utils/database');
const Sequelize = require('sequelize');


const Image = sequelize.define('image', {
    url: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Image;