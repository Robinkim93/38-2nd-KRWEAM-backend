const { catchAsync } = require('../util/globalErrorHandler');
const userService = require('../services/userService');

const signUp = catchAsync(async (req, res) => {
     const { nickName, phoneNumber, email, password } = req.body;

     if ( !nickName || !phoneNumber || !password || !email ) {
		const error = new Error('KEY_ERROR')
		error.statusCode = 400

		throw error
	}
     const insertId = await userService.signUp(nickName, phoneNumber, email, password);

  res.status(201).json({ insertId });
});

const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;

     if ( !password || !email ) {
		const error = new Error('KEY_ERROR')
		error.statusCode = 400

		throw error
	}

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

const getMyPageUserInfo = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  if (!userId) return res.status(400).json({ message: "KEY_ERROR" });

  const data = await userService.getMyPageUserInfo(userId);

  return res.status(200).json({ message: data });
});

const editUserInfo = catchAsync(async (req, res) => {
     const { email, password } = req.body;
     const userId = req.user.id; 

     if ( !password || !email ) {
		const error = new Error('KEY_ERROR')
		error.statusCode = 400

		throw error
	}

     await userService.editUserInfo(userId, email, password);
     res.status(200).json({ message : "Successfully Changed" });
});


module.exports = { signUp, signIn, kakaoAuth, kakaoLogIn, getMyPageUserInfo, editUserInfo };
