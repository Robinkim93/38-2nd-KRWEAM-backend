const searchController = require("../controllers/searchController");

const router = require("express").Router();

router.get("", searchController.getSearchResult);

module.exports = { router };
