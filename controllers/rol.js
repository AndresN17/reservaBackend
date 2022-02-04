'use strict'
const Rol = require('../models/rol');


exports.createRol = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const rolExists = await Rol.findOne({ where: { name: name } });
        if (rolExists) {
            const error = new Error("Rol already exists");
            error.statusCode = 404;
            throw error;
        }
        const rol = await Rol.create({ name: name, description: description });
        res.status(201).json({ rol: rol });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);

    }
};

exports.getRoles = async (req, res, next) => {
    try {
        const roles = await Rol.findAll();
        if (!roles) {
            const error = new Error("Roles don't found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ roles: roles });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.updateRol = async (req, res, next) => {
    try {
        const { rolId, name, description } = req.body;
        const rolExist = await Rol.findByPk(rolId);
        if (!rolExist) {
            const error = new Error("Rol doesn't found");
            error.statusCode = 404;
            throw error;
        }
        await rolExist.update({ name: name, description: description });
        res.status(200).json({ message: "Rol updated succesfully", rol: rolExist });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteRol = async (req, res, next) => {
    try {
        const { rolId } = req.body;
        const rolExist = await Rol.findByPk(rolId);
        if (!rolExist) {
            const error = new Error("Roles don't found");
            error.statusCode = 404;
            throw error;
        }
        await rolExist.destroy();
        res.status(200).json({ message: "Rol deleted succesfully" });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}