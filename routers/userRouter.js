const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const { loginRequired } = require('../util/auth');

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);

router.get("/auth/kakao", userController.kakaoAuth);
router.get("/auth/kakao/callback", userController.kakaoLogIn);
router.get("/info", loginRequired, userController.getMyPageUserInfo);

module.exports = router;