const { catchAsync } = require('../util/globalErrorHandler');
const userService = require('../services/userService');


const signUp = catchAsync(async (req, res) => {
     const { nickName, phoneNumber, email, password } = req.body;
     
     const insertId = await userService.signUp(nickName, phoneNumber, email, password);

     res.status(201).json({ insertId });
});

const signIn = catchAsync(async (req, res) => {
     const { email, password } = req.body;

     const accessToken = await userService.signIn(email, password);

     res.status(200).json({ accessToken });
});

const kakaoAuth = catchAsync(async (req, res) => {
     await userService.reqAuthCode(req, res);
});

const kakaoLogIn = catchAsync(async (req, res) => {
     const token = await userService.getKakaoToken(req, res);
     const userInfo = await userService.getUserInfo(token);

     const accessToken = await userService.kakaoLogIn(userInfo);
     res.status(200).json({ accessToken });

});


module.exports = { signUp, signIn, kakaoAuth, kakaoLogIn };