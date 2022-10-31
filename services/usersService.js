const usersDao = require("../models/usersDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pwdHash = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  return bcrypt.hash(password, salt);
};

const emailRegex = /[a-zA-Z0-9+_]+@[a-z]+\.+[a-z]/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{9,})/;

const signUp = async (nickname, phoneNumber, email, password) => {
  if (!emailRegex.test(email)) {
    const error = new Error("INVALID_EMAIL");
    error.statusCode = 400;

    throw error;
  }

  if (!passwordRegex.test(password)) {
    const error = new Error("INVALID_PASSWORD");
    error.statusCode = 400;

    throw error;
  }
  const hashPwd = await pwdHash(password);

  await usersDao.createUser(nickname, phoneNumber, email, hashPwd);
};

const signIn = async (email, password) => {
  const user = await usersDao.searchUser(email);
  const pwdMatch = await bcrypt.compare(password, user.password);

  if (!pwdMatch) {
    const error = new Error("WRONG_PASSWORD");
    error.statusCode = 401;

    throw error;
  }

  const accessToken = {
    accessToken: jwt.sign({ id: user.userId }, process.env.JWT_SECRET_KEY),
  };

  return accessToken;
};

module.exports = { signUp, signIn };
