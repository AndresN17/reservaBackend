'use strict'
const sequelize = require('../utils/database');
const Sequelize = require('sequelize');

const News = sequelize.define('new', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }

});

module.exports = News;