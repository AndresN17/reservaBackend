'use strict'
const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const localController = require('../controllers/local');

router.get('/local', localController.getLocals);
router.put('/local', localController.updateLocal);
router.post('/local', localController.createLocal);
router.delete('/local', localController.deleteLocal);

module.exports = router;