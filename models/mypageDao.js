const { database } = require("../util/dataSourceWrapperClass");

const getDealHistoriesBuyUser = async (userId) => {
  return await database.query(`
    SELECT 
    dh.product_id AS productId,
    dh.size_id AS sizeId,
    p.english_name AS productEngName,
    p.thumbnail AS productImage,
    dh.price AS buyPrice,
    dh.created_at AS created
    FROM deal_histories AS dh
    LEFT JOIN products AS p ON dh.product_id = p.id
    WHERE dh.buy_user_id = ${userId}
  `);
};

const getBuyPricesUser = async (userId) => {
  return await database.query(`
  SELECT 
  bp.product_id AS productId,
  p.english_name AS productEngName,
  p.thumbnail AS productImage,
  bp.price AS buyPrice,
  bp.created_at AS created
  FROM buy_prices AS bp
  LEFT JOIN products AS p ON bp.product_id = p.id
  WHERE bp.user_id = ${userId}
  `);
};

const getDealHistoriesSellUser = async (userId) => {
  return await database.query(`
    SELECT 
    dh.product_id AS productId,
    dh.size_id AS sizeId,
    p.english_name AS productEngName,
    p.thumbnail AS productImage,
    dh.price AS buyPrice,
    dh.created_at AS created
    FROM deal_histories AS dh
    LEFT JOIN products AS p ON dh.product_id = p.id
    WHERE dh.sell_user_id = ${userId}
  `);
};

const getSellPricesUser = async (userId) => {
  return await database.query(`
  SELECT 
  sp.product_id AS productId,
  p.english_name AS productEngName,
  p.thumbnail AS productImage,
  sp.price AS sellPrice,
  sp.created_at AS created
  FROM sell_prices AS sp
  LEFT JOIN products AS p ON sp.product_id = p.id
  WHERE sp.user_id = ${userId}
  `);
};

module.exports = {
  getBuyPricesUser,
  getDealHistoriesBuyUser,
  getDealHistoriesSellUser,
  getSellPricesUser,
};
