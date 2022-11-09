const wishService = require("../services/wishService");
const { catchAsync } = require("../util/globalErrorHandler");

const createWishList = catchAsync(async (req, res, next) => {
  const { productId, sizeId } = req.body;
  const userId = req.user.id;

  if (!userId || !productId || !sizeId) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }
  const data = await wishService.createWishList(userId, productId, sizeId);

  return await res.status(201).json({ message: data });
});

const deleteWishList = catchAsync(async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.user.id;

  if (!productId || !userId) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  const data = await wishService.deleteWishList(productId, userId);

  return await res.status(204);
});

const getWishList = catchAsync(async (req, res, next) => {
  const { userId } = req.user.id;

  if (!userId) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  const data = await wishService.getWishList(userId);

  return await res.status(200).json({ message: data });
});

module.exports = { createWishList, deleteWishList, getWishList };
