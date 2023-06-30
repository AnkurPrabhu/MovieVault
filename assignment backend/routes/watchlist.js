const express = require("express");
const router = express.Router();

const {
  getAllWtachList,
  addToWatchList,
  removeFromWatchList,
} = require("../controller/watchlist");

router.get("/watchlist", getAllWtachList);

router.post("/add_watchlist", addToWatchList);

router.delete("/remove_watchlist", removeFromWatchList);

module.exports = router;
