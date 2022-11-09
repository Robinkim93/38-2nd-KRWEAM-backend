const mypageController = require("../controllers/mypageController");
const { loginRequired } = require("../util/auth");

const router = require("express").Router();

router.get("", loginRequired, mypageController.getDealHistories);

module.exports = { router };
