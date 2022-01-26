'use strict'
const Business = require('../models/business');

exports.getBusinesses = async (req, res, next) => {
    try {
        const businesses = await Business.findAll();
        if (!businesses) {
            const error = new Error("There is no Businesses.");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ businesses: businesses });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.getBusinessById = async (req, res, next) => {
    try {
        const { businessId } = req.params;
        const businessExists = await Business.findByPk(businessId);
        if (!businessExists) {
            const error = new Error("Business doesn't exists.");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ business: businessExists });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

//Controlar imagen pendiente
exports.createBusiness = async (req, res, next) => {
    try {
        const { name, description, status, image } = req.body;
        const businessExists = await Business.findOne({ where: { name: name } });
        if (businessExists) {
            const error = new Error("A Business with this name already exists.");
            error.statusCode = 404;
            throw error;
        }
        const business = await Business.create({
            name: name,
            description: description,
            status: status,
            image: image
        });

        res.status(201).json({ message: "Business created succesfully", business: business });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};


exports.updateBusiness = async (req, res, next) => {
    try {
        const { businessId } = req.params;
        const { name, description, status, image } = req.body;
        const businessExists = await Business.findByPK(businessId);
        if (!businessExists) {
            const error = new Error("Business doesn't exists.");
            error.statusCode = 404;
            throw error;
        }
        await businessExists.update({
            name: name,
            description: description,
            status: status,
            image: image
        });
        res.status(200).json({ message: "Business updated successfully.", business: businessExists });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.deleteBusiness = async (req, res, next) => {
    try {
        const { businessId } = req.params;
        const businessExists = await Business.findByPk(businessId);
        if (!businessExists) {
            const error = new Error("Business doesn't exists.");
            error.statusCode = 404;
            throw error;
        }
        await businessExists.destroy();
        res.status(200).json({ message: "Business deleted successfully." });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};