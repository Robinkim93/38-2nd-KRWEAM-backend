const wishDao = require("../models/wishDao");

const createWishList = async (userId, productId, sizeId) => {
  return await wishDao.createWishList(userId, productId, sizeId);
};

const deleteWishList = async (productId, userId) => {
  return await wishDao.deleteWishList(productId, userId);
};

const getWishList = async (userId) => {
  return await wishDao.getWishList(userId);
};

module.exports = { createWishList, deleteWishList, getWishList };
