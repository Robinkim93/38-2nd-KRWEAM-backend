const mypageService = require("../services/mypageService");
const { catchAsync } = require("../util/globalErrorHandler");

const getDealHistories = catchAsync(async (req, res, next) => {
  const data = await mypageService.getDealHistories(userId);
  return await res.json({ message: data });
});
module.exports = { getDealHistories };
