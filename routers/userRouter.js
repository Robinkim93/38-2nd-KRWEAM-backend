const express = require("express");
const router = express.Router();
const { loginRequired } = require("../util/auth");

const userController = require("../controllers/userController");

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);

router.get("/auth/kakao", userController.kakaoAuth);
router.get("/auth/kakao/callback", userController.kakaoLogIn);
router.get("/info", loginRequired, userController.getMyPageUserInfo);

module.exports = router;
