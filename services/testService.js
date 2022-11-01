const testDao = require("../models/testDao");

const test = async () => {
  return await testDao.test();
};

module.exports = { test };
