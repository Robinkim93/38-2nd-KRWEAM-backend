const productService = require("../services/productService");
const { catchAsync } = require("../util/globalErrorHandler");

const getNewProducts = catchAsync(async(req, res) => {
     const { offset, limit } = req.query;

     if(!offset) {
          const error = new Error('KEY_ERROR');
          error.statusCode = 400;

          throw error;
     }
     if(!limit) {
          const error = new Error('KEY_ERROR');
          error.statusCode = 400;

          throw error;
     }

     const data = await productService.getNewProducts(+offset, +limit);
     return await res.status(200).json({ data });
});


module.exports = { getNewProducts }