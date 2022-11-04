const testController = require("../controllers/testController");

const router = require("express").Router();

router.get("", testController.test);

module.exports = router;
