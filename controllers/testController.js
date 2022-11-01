const testService = require("../services/testService");
const { catchAsync } = require("../util/globalErrorHandler");

const test = catchAsync(async (req, res, next) => {
  const data = await testService.test();
  return await res.json({ message: data });
});

module.exports = { test };
