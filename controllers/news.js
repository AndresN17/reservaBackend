'use strict';
const News = require('../models/news');


exports.getNews = async (req, res, next) => {
    try {
        const news = await News.findAll();
        if (!news) {
            const error = new Error("There is no news.");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ news: news });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getNewsById = async (req, res, next) => {
    try {
        const { newsId } = req.params;
        const newsExists = await News.findById(newsId);
        if (!newsExists) {
            const error = new Error("There is no news");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ news: newsExists });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.createNews = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const news = await News.create({ title: title, description: description });
        res.status(201).json({ news: news });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.updateNews = async (req, res, next) => {
    try {
        const { newsId } = req.params;
        const { title, description, likes } = req.body;
        const newsExists = await News.findById(newsId);
        if (!newsExists) {
            const error = new Error("The news doesn't exists");
            error.statusCode = 404;
            throw error;
        }
        await newsExists.update({ title: title, description: description, likes: likes });
        res.status(201).json({ message: "News updated succesfully", news: newsExists });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.deleteNews = async (req, res, next) => {
    try {
        const { newsId } = req.params;
        const newsExists = await News.findById(newsId);
        if (!newsExists) {
            const error = new Error("The news doesn't exists");
            error.statusCode = 404;
            throw error;
        }
        await newsExists.destroy();
        res.status(201).json({ message: "News deleted succesfully" });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};