const wishController = require("../controllers/wishController");
const { loginRequired } = require("../util/auth");

const router = require("express").Router();

router.post("", loginRequired, wishController.createWishList);
router.delete("/:productId", loginRequired, wishController.deleteWishList);
router.get("", loginRequired, wishController.getWishList);

module.exports = { router };
