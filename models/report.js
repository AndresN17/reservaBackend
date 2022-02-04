'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    id: String,
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    enable: String,
    image: String,
    title: String,
    description: String,
    comment: String,
    Log: String,
});

module.exports = mongoose.model('reporte', reportSchema, 'reporte');