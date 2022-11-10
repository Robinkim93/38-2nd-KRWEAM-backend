const productService = require("../services/productService");
const { catchAsync } = require("../util/globalErrorHandler");

const getNewProducts = catchAsync(async (req, res) => {
  const { offset, limit } = req.query;

  if (!offset) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;

    throw error;
  }
  if (!limit) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;

    throw error;
  }

  const data = await productService.getNewProducts(+offset, +limit);
  return await res.status(200).json({ data });
});

const getProductInfo = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  if (!productId) return res.status(400).json({ message: "KEY_ERROR" });

  const data = await productService.getProductInfo(productId);

  return await res.status(200).json({ message: data });
});

const getProductHistories = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  if (!productId) return res.status(400).json({ message: "KEY_ERROR" });

  const data = await productService.getProductHistories(productId);

  return await res.status(200).json({ message: data });
});

const getBrandProduct = catchAsync(async (req, res, next) => {
  const brandName = req.params.brandname;

  if (!brandName) return res.status(400).json({ message: "KEY_ERROR" });

  const data = await productService.getBrandProduct(brandName);

  return await res.status(200).json({ message: data });
});

module.exports = {
  getNewProducts,
  getProductInfo,
  getProductHistories,
  getBrandProduct,
};
