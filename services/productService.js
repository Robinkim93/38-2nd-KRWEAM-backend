const productDao = require("../models/productDao");

const getProductInfo = async (productId) => {
  return await productDao.getProductInfo(productId);
};

const getProductHistories = async (productId) => {
  return await productDao.getProductHistories(productId);
};

const getBrandProduct = async (brandName) => {
  return await productDao.getBrandProduct(brandName);
};

const getNewProducts = async(offset, limit, userId) => {
     const data = await productDao.getNewProducts(offset, limit);
     if(userId!=0){
          const interestedProducts =await productDao.getInterestedItem(userId); 

          for(let value of data){
               value.LikedStatus=false
               if(interestedProducts){
                    for(let productId of interestedProducts.productId){
                         if(value.productId==productId) value.LikedStatus=true
                    }
               }
          }
     }
     return data;
};

const getApplicableProducts = async(keyword, brand, category, gender, offset, limit, userId) => {
     let result=``;
     let count=0;

     if(brand){
          result+=`WHERE p.brand_id=${brand}`
          count++
     }
     if(category){
          if(count==0) {
               result+=`WHERE p.category_id=${category}`
               count++
          } else if(count!=0) result+=` AND p.category_id=${category}`;
     }
     if(gender){
          if(count==0){
               result+=`WHERE (p.gender_id=3 OR p.gender_id=${gender})`
               count++
          } else if(count!=0) result+=` AND (p.gender_id=3 OR p.gender_id=${gender})`;
     }
     if(keyword){
          if(count==0){
               result+=`WHERE (b.english_name LIKE '%${keyword}%' || b.korean_name LIKE '%${keyword}%' || p.english_name LIKE '%${keyword}%' || p.korean_name LIKE '%${keyword}%')`
          } else if(count!=0) result+=` AND (b.english_name LIKE '%${keyword}%' || b.korean_name LIKE '%${keyword}%' || p.english_name LIKE '%${keyword}%' || p.korean_name LIKE '%${keyword}%')`
     }

     const data = await productDao.getApplicableProducts(result, offset, limit);

     if(userId!=0){
          const interestedProducts =await productDao.getInterestedItem(userId);

          for(let value of data){
               value.LikedStatus=false
               if(interestedProducts){
                    for(let productId of interestedProducts.productId){
                         if(value.id==productId) value.LikedStatus=true
                    }
               }
          }
     }
     return data;
};

module.exports = {
     getProductInfo,
     getProductHistories,
     getBrandProduct,
     getNewProducts, 
     getApplicableProducts 
}
