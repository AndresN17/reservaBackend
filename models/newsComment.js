'use strict'
const sequelize = require('../utils/database');
const Sequelize = require('sequelize');

const NewsComment = sequelize.define('newsComment', {
    /* userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    newsId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'News',
            key: 'id'
        }
    }, */
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = NewsComment;