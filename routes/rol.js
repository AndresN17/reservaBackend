'use strict'
const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rol');

router.post('/rol', rolController.createRol);
router.put('/rol', rolController.updateRol);
router.delete('/rol', rolController.deleteRol);
router.get('/rol', rolController.getRoles);


module.exports = router;