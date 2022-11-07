const productController = require("../controllers/productController");

const router = require("express").Router();

router.get("", productController.getNewProducts);
router.get("/info/:productId", productController.getProductInfo);
router.get("/graph/:productId", productController.getProductHistories);
router.get("/relation/:brandname", productController.getBrandProduct);

module.exports = { router };
