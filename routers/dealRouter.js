const dealController = require("../controllers/dealController");

const router = require("express").Router();

router.post("/buy", dealController.requestBuy);
router.post("/sell", dealController.requestSell);
router.get("/:productId/:userId", dealController.getProductInfo);

module.exports = { router };
