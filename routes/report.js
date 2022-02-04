'use strict'
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report');

router.get('/report', reportController.getReport);

module.exports = router;