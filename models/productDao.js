const { database } = require("../util/dataSourceWrapperClass");

const getNewProducts = async(offset, limit) => {
     const data = await database.query(`
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
          LIMIT ?, ?`, [offset, limit]
     );
     return data;
};

module.exports = { getNewProducts }