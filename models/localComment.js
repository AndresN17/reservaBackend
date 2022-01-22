'use strict'
const sequelize = require('../utils/database');
const Sequelize = require('sequelize');

const LocalComment = sequelize.define('localComment', {
    /* userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    localId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Locals',
            key: 'id'
        }
    }, */
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = LocalComment;