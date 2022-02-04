'use strict'
const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const businessController = require('../controllers/business');

router.get('/business', businessController.getBusinesses);
router.get('/business/:userId', businessController.getBusinesses);
router.put('/business', isAuth, businessController.updateBusiness);
router.post('/business', isAuth, businessController.createBusiness);
router.delete('/business', businessController.deleteBusiness);

module.exports = router;