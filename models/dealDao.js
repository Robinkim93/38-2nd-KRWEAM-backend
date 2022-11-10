const { krweamDataSource } = require("../util/dataSourceWrapperClass");

const createBuy = async (productId, userId, price, sizeId,totalPrice ) => {
  const queryRunner = krweamDataSource.createQueryRunner();
  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const sellPriceData = await queryRunner.query(`
    SELECT
      bp.id AS sellPriceId,
      bp.product_id AS sellProductId,
      bp.user_id AS sellUserId,
      bp.price AS sellPrice
    FROM sell_prices AS bp
    WHERE product_id = ${productId} AND price = ${price}
    ORDER BY created_at ASC
    LIMIT 1
    `);

    if (sellPriceData.length == 0) {
      const data = await queryRunner.query(`
      INSERT INTO buy_prices (
        product_id,
        user_id,
        price
      ) VALUE (
        ${productId}, ${userId}, ${price}
      )
    `);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return "ADD_BUYPRICE_DATA";
    }

    const { sellPriceId, sellProductId, sellUserId, sellPrice } =
      sellPriceData[0];

    const dealHistoriesRow = await queryRunner.query(
      `
      INSERT INTO deal_histories (sell_user_id, buy_user_id, product_id, price, size_id) VALUES (?,?,?,?,?)
    `,
      [sellUserId, userId, sellProductId, sellPrice, sizeId]
    );
    

    await queryRunner.query(`
    DELETE FROM sell_prices WHERE id = ${sellPriceId}
  `);

    const sellerId = await queryRunner.query(`
    SELECT sell_user_id FROM deal_histories WHERE id = ${dealHistoriesRow.insertId} LIMIT 1
  `);

    const buyerId = await queryRunner.query(`
    SELECT buy_user_id FROM deal_histories WHERE id = ${dealHistoriesRow.insertId} LIMIT 1
  `);

    const sellerPoint = await queryRunner.query(`
    UPDATE users SET point = point + ${sellPrice} WHERE id = ${sellerId[0].sell_user_id}
  `);

    const buyPoint = await queryRunner.query(`
    UPDATE users SET point = point - ${totalPrice} WHERE id = ${buyerId[0].buy_user_id}
  `);

    await queryRunner.commitTransaction();
    await queryRunner.release();

    return "DEAL COMPLETE";
  } catch (error) {
    console.log(error.message);

    await queryRunner.rollbackTransaction();
    await queryRunner.release();

    throw error;
  }
};

const createSell = async (productId, userId, price, sizeId, totalPrice) => {
  const queryRunner = krweamDataSource.createQueryRunner();
  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const buyPriceData = await queryRunner.query(`
    SELECT
      bp.id AS buyPriceId,
      bp.product_id AS buyProductId,
      bp.user_id AS buyUserId,
      bp.price AS buyPrice
    FROM buy_prices AS bp
    WHERE product_id = ${productId} AND price = ${price}
    ORDER BY created_at ASC
    LIMIT 1
    `);

    if (buyPriceData.length == 0) {
      const data = await queryRunner.query(`
        INSERT INTO sell_prices (
          product_id,
          user_id,
          price
        ) VALUE (
          ${productId}, ${userId}, ${price}
        )
      `);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return "ADD_SELLPRICE_DATA";
    }

    const { buyPriceId, buyProductId, buyUserId, buyPrice } = buyPriceData[0];

    const dealHistoriesRow = await queryRunner.query(
      `
        INSERT INTO deal_histories (sell_user_id, buy_user_id, product_id, price, size_id) VALUES (?,?,?,?,?)
      `,
      [buyUserId, userId, buyProductId, buyPrice, sizeId]
    );

    await queryRunner.query(`
      DELETE FROM buy_prices WHERE id = ${buyPriceId}
    `);

    const sellerId = await queryRunner.query(`
      SELECT sell_user_id FROM deal_histories WHERE id = ${dealHistoriesRow.insertId}
    `);

    const buyerId = await queryRunner.query(`
      SELECT buy_user_id FROM deal_histories WHERE id = ${dealHistoriesRow.insertId}
    `);

    const sellerPoint = await queryRunner.query(`
      UPDATE users SET point = point + ${buyPrice} WHERE id = ${sellerId[0].sell_user_id}
    `);

    const buyPoint = await queryRunner.query(`
      UPDATE users SET point = point - ${totalPrice} WHERE id = ${buyerId[0].buy_user_id}
    `);

    await queryRunner.commitTransaction();
    await queryRunner.release();

    return "DEAL COMPLETE";
  } catch (error) {
    console.log(error);

    await queryRunner.rollbackTransaction();
    await queryRunner.release();

    throw error;
  }
};

const getProductInfo = async (productId, userId) => {
  const data = await krweamDataSource.query(`
    SELECT 
    p.thumbnail AS productImage,
    p.model_number AS modelNumber,
    p.korean_name AS productKrName,
    p.english_name AS productEngName,
    p.category_id AS categoryId,
    (SELECT sp.price FROM sell_prices AS sp WHERE sp.product_id = ${productId} ORDER BY sp.price ASC LIMIT 1) AS sellPrice,
    (SELECT bp.price FROM buy_prices AS sp WHERE bp.product_id = ${productId} ORDER BY bp.price ASC LIMIT 1) AS buyPrice,
    (SELECT u.point FROM users AS u WHERE u.id = ${userId}) as point
    FROM products AS p
    LEFT JOIN categories AS c ON p.category_id = c.id
    LEFT JOIN buy_prices AS bp ON bp.product_id = p.id
    LEFT JOIN sell_prices AS sp ON sp.product_id = p.id
    WHERE p.id = ${productId}
  `);
  return data[0];
};

module.exports = {
  createBuy,
  createSell,
  getProductInfo,
};
