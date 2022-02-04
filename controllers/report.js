'use strict'
const Report = require('../models/report');


exports.getReport = async (req, res, next) => {
    try {
        const report = await Report.find({});
        res.status(200).json({ report: report });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}