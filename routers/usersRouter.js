const usersController = require("../controllers/usersController");

const router = require("express").Router();

router.post("/signup", usersController.signUp);
router.post("/signin", usersController.signIn);

module.exports = { router };
