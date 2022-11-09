const mypageController = require("../controllers/mypageController");

const router = require("express").Router();

router.get("", mypageController.getDealHistories);

module.exports = { router };
