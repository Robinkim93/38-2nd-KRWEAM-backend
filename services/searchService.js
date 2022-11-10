const searchDao = require("../models/searchDao");

const getSearchResult = async (keyword) => {
  return await searchDao.getSearchResult(keyword);
};

module.exports = { getSearchResult };
