'use strict'
const sequelize = require('../utils/database');
const Sequelize = require('sequelize');

const Category = sequelize.define('category', {
    name:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    description:{
        type: Sequelize.TEXT
    }
});

module.exports = Category;