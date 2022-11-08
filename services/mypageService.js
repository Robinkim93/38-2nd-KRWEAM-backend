const mypageDao = require("../models/mypageDao");

const getDealHistories = async (userId) => {
  const completeBuyDealHistories = await mypageDao.getDealHistoriesBuyUser(
    userId
  );
  const currentDealBuyHistories = await mypageDao.getBuyPricesUser(userId);
  const completeDealSellHistories = await mypageDao.getDealHistoriesSellUser(
    userId
  );
  const currentDealSellHistories = await mypageDao.getSellPricesUser(userId);

  const result = [
    {
      buy: [
        {
          status: "입찰 중",
          productList: currentDealBuyHistories,
        },
        { status: "진행 중" },
        {
          status: "결제완료",
          productList: completeBuyDealHistories,
        },
      ],
      sell: [
        {
          status: "입찰 중",
          productList: currentDealSellHistories,
        },
        { status: "진행 중" },
        {
          status: "결제완료",
          productList: completeDealSellHistories,
        },
      ],
    },
  ];

  return result;
};

module.exports = { getDealHistories };
