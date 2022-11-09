const productDao = require("../models/productDao");

const getNewProducts = async(offset, limit) => {
     
     return await productDao.getNewProducts(offset, limit);

};

module.exports = { getNewProducts }

