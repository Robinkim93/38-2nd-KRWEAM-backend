const { database } = require("../util/dataSourceWrapperClass");

const createWishList = async (userId, productId, sizeId) => {
  const data = await database.query(
    `
    INSERT INTO interested_items (
      user_id, product_id, size_id)
    VALUE (?, ?, ?)
  `,
    [userId, productId, sizeId]
  );
  return data.insertId;
};

const deleteWishList = async (productId, userId) => {
  const data = await database.query(`
    DELETE FROM interested_items WHERE product_id = ${productId} AND user_id = ${userId}
  `);

  return data.affectedRows;
};

const getWishList = async (userId) => {
  return await database.query(`
  SELECT
    ii.product_id AS productId,
    s.size,
    p.english_name AS productName,
    b.english_name AS brandName,
    p.thumbnail AS productImage,
    SUBSTRING_INDEX(GROUP_CONCAT(bp.price ORDER BY bp.price ASC), ',', '1') AS productPrice
  FROM interested_items AS ii
  LEFT JOIN products AS p ON ii.product_id = p.id
  LEFT JOIN brands AS b ON p.brand_id = b.id
  LEFT JOIN buy_prices AS bp ON bp.product_id = p.id
  LEFT JOIN sizes AS s ON ii.size_id = s.id
  WHERE ii.user_id = ${userId}
  GROUP BY productId, s.size
  `);
};

module.exports = { createWishList, deleteWishList, getWishList };
