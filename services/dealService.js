const dealDao = require("../models/dealDao");

const requestBuy = async (productId, userId, price, totalPrice, sizeId) => {
  return await dealDao.createBuy(productId, userId, price, totalPrice, sizeId);
};

const requestSell = async (productId, userId, price, totalPrice, sizeId) => {
  return await dealDao.createSell(productId, userId, price, totalPrice, sizeId);
};

const getProductInfo = async (productId, userId) => {
  return await dealDao.getProductInfo(productId, userId);
};

module.exports = { requestBuy, requestSell, getProductInfo };
