'use strict'
const Local = require('../models/local');
const Business = require('../models/business');

exports.getLocals = async (req, res, next) => {
    try {
        const locals = await Local.findAll({
            include: Business,
        });
        if (!locals) {
            const error = new Error("There is no locals.");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ locals: locals });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};


exports.getLocalById = async (req, res, next) => {
    try {
        const { localId } = req.params;
        const localExist = await Local.findByPk(localId);
        if (!localExist) {
            const error = new Error("Local doesn't exists.");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ local: localExist });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

// Falta poner validacion
exports.createLocal = async (req, res, next) => {
    try {
        const { name, direction, costPerHour, city, businessId } = req.body;
        const newLocal = await Local.create({ name: name, direction: direction, costPerHour: costPerHour, city: city, businessId: businessId });
        res.status(201).json({ message: "Local created succesfully.", local: newLocal });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//Falta agregar las imagenes
exports.updateLocal = async (req, res, next) => {
    try {
        const { localId, name, direction, costPerHour, city } = req.body;
        const local = await Local.findByPk(localId);
        if (!local) {
            const error = new Error("Local doesn't exists.");
            error.statusCode = 404;
            throw error;
        }
        await local.update({ name: name, direction: direction, costPerHour: costPerHour, city: city });
        res.status(201).json({ message: "Local updated successfully.", local: local });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.deleteLocal = async (req, res, next) => {
    try {
        const { localId } = req.body;
        const localExist = await Local.findByPk(localId);
        if (!localExist) {
            const error = new Error("Local doesn't exists.");
            error.statusCode = 404;
            throw error;
        }
        await localExist.destroy();
        res.status(201).json({ message: "Local deleted succesfully." });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};