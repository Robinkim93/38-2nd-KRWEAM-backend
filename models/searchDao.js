const { database } = require("../util/dataSourceWrapperClass");

const getSearchResult = async (keyword) => {
  return await database.query(`
        SELECT
            p.thumbnail,
            p.english_name,
            p.korean_name,
            p.id
        FROM products AS p
        WHERE (english_name LIKE "%${keyword}%" OR korean_name LIKE "%${keyword}%")
        LIMIT 10
    `);
};

module.exports = { getSearchResult };
