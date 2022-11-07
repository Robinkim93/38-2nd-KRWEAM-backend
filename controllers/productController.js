const productService = require("../services/productService");
const { catchAsync } = require("../util/globalErrorHandler");

function isInt(value) {
     var er = /^-?[0-9]+$/;
     return er.test(value);
 };

const getNewProducts = catchAsync(async(req, res) => {
     const { offset, limit } = req.query;
     let userId=0;
     if(req.user) userId = req.user.id;

     if(!isInt(offset) || !isInt(limit)) {
          const error = new Error('KEY_ERROR');
          error.statusCode = 400;

          throw error;
     }
     const data = await productService.getNewProducts(+offset, +limit, userId);
     return await res.status(200).json({ data });
});

const getApplicableProducts = catchAsync(async(req, res) => {
     const { keyword, brand, category, gender, offset, limit } = req.query;
     let userId=0;
     if(req.user) userId = req.user.id;

     if(!isInt(offset) || !isInt(limit)) {
          const error = new Error('KEY_ERROR');
          error.statusCode = 400;

          throw error;
     }
     const data = await productService.getApplicableProducts(keyword, +brand, +category, +gender, +offset, +limit, userId);
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
  getApplicableProducts,
  getProductInfo,
  getProductHistories,
  getBrandProduct,
};