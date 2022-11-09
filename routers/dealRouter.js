const dealController = require("../controllers/dealController");
const { loginRequired } = require("../util/auth");

const router = require("express").Router();

router.post("/buy", loginRequired, dealController.requestBuy);
router.post("/sell", loginRequired, dealController.requestSell);
router.get("/:productId", loginRequired, dealController.getProductInfo);

module.exports = { router };
