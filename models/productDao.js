const { database } = require("../util/dataSourceWrapperClass");

const getNewProducts = async (offset, limit) => {
  const data = await database.query(
    `
     SELECT
          p.id AS productId,
          b.english_name AS brand,
          p.english_name AS productEngName,
          p.korean_name AS productKorName,
          p.thumbnail AS productImage,
          s.sizes AS sizes,
          sp.price AS buyPrice
          FROM products p
          LEFT JOIN brands b ON p.brand_id = b.id
          LEFT JOIN categories c ON c.id=p.category_id
          LEFT JOIN(
               SELECT
               category_id,
               JSON_ARRAYAGG(size) AS sizes
               FROM sizes
               GROUP BY category_id
               ) s ON s.category_id=c.id
          LEFT JOIN(
               SELECT
                    product_id,
                    Min(price) AS price
               FROM sell_prices
               GROUP BY product_id
          ) sp ON sp.product_id = p.id
          ORDER BY p.id DESC
          LIMIT ?, ?`,
    [offset, limit]
  );
  return data;
};

const getProductInfo = async (productId) => {
  const data = await database.query(`
       SELECT
         p.category_id AS categoryId, 
         b.english_name AS brandEngName,
         p.english_name AS productEngName,  
         p.korean_name AS productKrName,
         p.thumbnail AS productImage,
         p.model_number AS modelNumber,
         p.color,
         p.released_price,
         (SELECT bp.price FROM buy_prices AS bp WHERE bp.product_id = ${productId} ORDER BY bp.price ASC LIMIT 1) AS buyPrice,
         (SELECT sp.price FROM sell_prices AS sp WHERE sp.product_id = ${productId} ORDER BY sp.price ASC LIMIT 1) AS sellPrice,
         (SELECT dh.price FROM deal_histories AS dh WHERE dh.product_id = ${productId} ORDER BY dh.price ASC LIMIT 1) AS recentlyPrice
       FROM products AS p
       LEFT JOIN brands AS b ON p.brand_id = b.id
       WHERE p.id = ${productId}
     `);
  return data;
};

const getProductHistories = async (productId) => {
  return await database.query(`
       SELECT 
         p.id AS productId,
         (SELECT 
           JSON_ARRAYAGG(
           JSON_OBJECT(
             "price", dh.price,
             "date", dh.created_at
           )
         )
         FROM deal_histories AS dh
         WHERE dh.product_id = ${productId}) AS complete,
         (SELECT 
           JSON_ARRAYAGG(
             JSON_OBJECT(
               "price", bp.price,
               "date", bp.created_at
             )
           )
         FROM buy_prices AS bp
         WHERE bp.product_id = ${productId}) AS buy,
         (SELECT 
           JSON_ARRAYAGG(
             JSON_OBJECT(
               "price", sp.price,
               "date", sp.created_at
             )
           )
         FROM sell_prices AS sp
         WHERE sp.product_id = ${productId}) AS sell
       FROM products AS p
       WHERE p.id = ${productId}
     `);
};

const getBrandProduct = async (brandName) => {
  return await database.query(`
       SELECT 
       p.id,
       b.english_name AS brandName,
       p.english_name AS productEngName,
       p.thumbnail AS productImage,
       SUBSTRING_INDEX(GROUP_CONCAT(bp.price ORDER BY bp.price ASC), "," , "1") AS price
       FROM products AS p
       LEFT JOIN brands AS b ON p.brand_id = b.id
       LEFT JOIN buy_prices AS bp ON bp.product_id = p.id
       WHERE b.english_name = "${brandName}"
       GROUP BY p.id
     `);
};

module.exports = {
  getNewProducts,
  getProductInfo,
  getProductHistories,
  getBrandProduct,
};
