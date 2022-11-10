const router = require("express").Router();

const dealRouter = require("./dealRouter");
const mypageRouter = require("./mypageRouter");
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const wishRouter = require("./wishRouter");

router.use("/deal", dealRouter.router);
router.use("/dealhistories", mypageRouter.router);
router.use("/users", userRouter);
router.use("/products", productRouter.router);
router.use("/deal", dealRouter.router);
router.use("/wish", wishRouter.router);

module.exports = router;
