'use strict'
const sequelize = require('../utils/database');
const Sequelize = require('sequelize');

const Business = sequelize.define('business',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT
    },
    status:{
        type: Sequelize.STRING,
    },
    image:{
        type: Sequelize.STRING,
    }
});

module.exports = Business;