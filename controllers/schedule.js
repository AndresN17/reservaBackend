'use strict'
const Schedule = require('../models/schedule');

exports.getSchedule = async (req, res, next) => {
    try {

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.updateSchedule = async (req, res, next) => {
    try {

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.deleteSchedule = async (req, res, next) => {
    try {

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};