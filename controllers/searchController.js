const searchService = require("../services/searchService");
const { catchAsync } = require("../util/globalErrorHandler");

const getSearchResult = catchAsync(async (req, res, next) => {
  const { keyword } = req.query;

  if (!keyword) return res.status(400).json({ message: "KEY_ERROR" });

  const data = await searchService.getSearchResult(keyword);

  return res.status(200).json({ message: data });
});

module.exports = { getSearchResult };
