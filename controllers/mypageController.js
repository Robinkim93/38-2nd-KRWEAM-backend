const mypageService = require("../services/mypageService");
const { catchAsync } = require("../util/globalErrorHandler");

const getDealHistories = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  if (!userId) return res.status(400).json({ message: "KEY_ERROR" });

  const data = await mypageService.getDealHistories(userId);
  return await res.json({ message: data });
});
module.exports = { getDealHistories };
