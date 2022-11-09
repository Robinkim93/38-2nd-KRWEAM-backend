const router = require("express").Router();

const dealRouter = require("./dealRouter");
const testRouter = require("./testRouter");
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");

router.use("/deal", dealRouter.router);
router.use("/test", testRouter);
router.use("/users", userRouter);
router.use("/products", productRouter.router);

module.exports = router;
