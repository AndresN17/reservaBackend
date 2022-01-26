'use strict'
const Category = require('../models/category');


exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category.findAll();
        if (!categories) {
            const error = new Error("There is no categories");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ categories: categories });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.getCategoryById = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            const error = new Error("The category doesn't exist.");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ category: category });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.createCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const categoryExists = await Category.findOne({ where: { name: name } });
        if (categoryExists) {
            const error = new Error("The category already exists.");
            error.statusCode = 404;
            throw error;
        }
        const category = await Category.create({ name: name, description: description });
        res.status(201).json({ message: "Category created succesfully", category: category });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.updateCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const { name, description } = req.body;
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            const error = new Error("The category doesn't exist.");
            error.statusCode = 404;
            throw error;
        }
        await categoryExists.update({ name: name, description: description });
        res.status(200).json({ message: "Category updated succesfully", category: categoryExists });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.deleteCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            const error = new Error("The category doesn't exist.");
            error.statusCode = 404;
            throw error;
        }
        await category.destroy();
        res.status(200).json({ message: "Category deleted succcesfully." });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};