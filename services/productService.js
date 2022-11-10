const productDao = require("../models/productDao");

const getNewProducts = async (offset, limit) => {
  return await productDao.getNewProducts(offset, limit);
};

const getProductInfo = async (productId) => {
  return await productDao.getProductInfo(productId);
};

const getProductHistories = async (productId) => {
  return await productDao.getProductHistories(productId);
};

const getBrandProduct = async (brandName) => {
  return await productDao.getBrandProduct(brandName);
};

module.exports = {
  getNewProducts,
  getProductInfo,
  getProductHistories,
  getBrandProduct,
};
