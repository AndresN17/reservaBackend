'use strict'

const Category = require('../models/category');


exports.getCategories = async (req, res, next) => {
    try {

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.getCategoryById = async (req, res, next) => {
    try {

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.updateCategory = async (req, res, next) => {
    try {

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.deleteCategory = async (req, res, next) => {
    try {

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};