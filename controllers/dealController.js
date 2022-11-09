const dealService = require("../services/dealService");
const { catchAsync } = require("../util/globalErrorHandler");

const requestBuy = catchAsync(async (req, res, next) => {
  const { productId, price, totalPrice, sizeId } = req.body;
  const userId = req.user.id;

  if (!productId || !userId || !price || !sizeId || !totalPrice) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  const data = await dealService.requestBuy(
    productId,
    userId,
    price,
    sizeId,
    totalPrice
  );

  return await res.json({ message: data });
});

const requestSell = catchAsync(async (req, res, next) => {
  const { productId, price, sizeId, totalPrice } = req.body;
  const userId = req.user.id;

  if (!productId || !userId || !price || !sizeId || !totalPrice) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  const data = await dealService.requestSell(
    productId,
    userId,
    price,
    sizeId,
    totalPrice
  );

  return await res.json({ message: data });
});

const getProductInfo = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user.id;

  if (!productId || !userId) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  const data = await dealService.getProductInfo(productId, userId);

  return await res.json({ message: data });
});

module.exports = { requestBuy, requestSell, getProductInfo };
