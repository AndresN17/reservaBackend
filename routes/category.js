'use strict'
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

router.get('/category', categoryController.getCategories);
router.post('/category', categoryController.createCategory);
router.put('/category', categoryController.updateCategory);
router.delete('/category', categoryController.deleteCategory);


module.exports = router;