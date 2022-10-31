const router = require("express").Router();
const usersRouter = require("./usersRouter");

router.use("/users", usersRouter.router);

module.exports = router;
