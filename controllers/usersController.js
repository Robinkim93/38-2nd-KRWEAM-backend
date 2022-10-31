const usersService = require("../services/usersService");
const { catchAsync } = require("../util/globalErrorHandler");

const signUp = catchAsync(async (req, res, next) => {
  const { nickname, phoneNumber, email, password } = req.body;
  if (!nickname || !phoneNumber || !email || !password) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }
  await usersService.signUp(nickname, phoneNumber, email, password);

  return res.status(200).json({ message: "SIGNUP_SUCCESS" });
});

const signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  const token = await usersService.signIn(email, password);

  return res.status(200).json({
    message: "LOGIN_SUCCESS",
    token: token.accessToken,
  });
});

module.exports = { signUp, signIn };
