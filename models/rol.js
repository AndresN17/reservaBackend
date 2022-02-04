'use strict'
const sequelize = require('../utils/database');
const Sequelize = require('sequelize');

const Rol = sequelize.define('rol', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
    }

});

module.exports = Rol;