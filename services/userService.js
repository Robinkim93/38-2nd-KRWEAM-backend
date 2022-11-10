require("dotenv").config();
const userDao = require("../models/userDao");

const axios = require("axios");
const qs = require("qs");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

const EMAILREGEX =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
const PWREGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const hashPassword = async (plaintextPassword) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  return await bcrypt.hash(plaintextPassword, salt);
};

const getUserById = async (id) => {
  return await userDao.getUserById(id);
};

const signUp = async (nickName, phoneNumber, email, password) => {
  if (!nickName || !phoneNumber || !password || !email) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;

    throw error;
  }

  if (!EMAILREGEX.test(email)) {
    const error = new Error("INVALID_EMAIL");
    error.statusCode = 400;

    throw error;
  }

  if (!PWREGEX.test(password)) {
    const error = new Error("INVALID_PASSWORD");
    error.statusCode = 400;

    throw error;
  }

  const hashedPassword = await hashPassword(password);

  return await userDao.createUserWithEmail(
    nickName,
    phoneNumber,
    email,
    hashedPassword
  );
};

const signIn = async (email, password) => {
  if (!EMAILREGEX.test(email)) {
    const error = new Error("INVALID_EMAIL");
    error.statusCode = 400;

    throw error;
  }

  if (!PWREGEX.test(password)) {
    const error = new Error("INVALID_PASSWORD");
    error.statusCode = 400;

    throw error;
  }

  const user = await userDao.getUserByEmail(email);

  if (!user) {
    const error = new Error("WRONG_EMAIL");
    error.statusCode = 401;
    throw error;
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    const error = new Error("WRONG_PASSWORD");
    error.statusCode = 401;

    throw error;
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return accessToken;
};

const reqAuthCode = async (req, res) => {
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}`;
  res.redirect(kakaoAuthURL);
};

const getKakaoToken = async (req, res) => {
  let token = await axios({
    method: "POST",
    url: "https://kauth.kakao.com/oauth/token",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify({
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_CLIENT_ID,
      client_secret: process.env.KAKAO_CLIENT_SECRET,
      redirectUri: process.env.KAKAO_REDIRECT_URI,
      code: req.query.code,
    }),
  });
  return token.data.access_token;
};

const getUserInfo = async (token) => {
  let user;
  try {
    user = await axios({
      method: "get",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    res.json(e.data);
  }
  return user.data;
};

const kakaoLogIn = async (userInfo) => {
    const user = await userDao.getUserByKaKaoId(userInfo.id);
    let userId;
    console.log(user);
    if (user.length == 0) {
      userId = await userDao.createUserWithKakao(
        userInfo.properties.nickname,
        userInfo.id
      );
    } else {
      userId = user[0].id;
    }
    const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
      algorithm: process.env.ALGORITHM,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return accessToken;
};

const getMyPageUserInfo = async (userId) => {
  return await userDao.getMyPageUserInfo(userId);
};

module.exports = {
  signUp,
  signIn,
  getUserById,
  reqAuthCode,
  getKakaoToken,
  getUserInfo,
  kakaoLogIn,
  getMyPageUserInfo
};
