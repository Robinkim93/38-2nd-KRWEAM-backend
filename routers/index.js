const router = require("express").Router();

const dealRouter = require("./dealRouter");
const testRouter = require("./testRouter");
const userRouter = require("./userRouter");

router.use("/deal", dealRouter.router);
router.use("/test", testRouter);
router.use("/users", userRouter);

module.exports = router;
