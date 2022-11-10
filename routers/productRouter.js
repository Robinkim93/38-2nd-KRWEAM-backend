const productController = require("../controllers/productController");
const { loginCheck } = require('../util/auth');

const router = require("express").Router();

router.get("/info/:productId", loginCheck, productController.getProductInfo);
router.get("/graph/:productId", productController.getProductHistories);
router.get("/relation/:brandname", productController.getBrandProduct);
router.get('/sort', loginCheck, productController.getApplicableProducts);
router.get('', loginCheck, productController.getNewProducts);

module.exports = { router };
