const productController = require('../controllers/productController');

const router = require('express').Router();

router.get('', productController.getNewProducts);

module.exports = { router }
