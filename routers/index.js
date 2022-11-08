const router = require("express").Router();
const dealRouter = require("./dealRouter");

router.use("/deal", dealRouter.router);

module.exports = router;
