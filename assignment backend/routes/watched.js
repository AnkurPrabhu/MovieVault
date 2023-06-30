const express = require("express");
const router = express.Router();

const {
  getAllWtachedList,
  addToWatchedList,
  removeFromWatchedList,
  giveRating,
} = require("../controller/watchedlist");

router.get("/watchedlist", getAllWtachedList);

router.post("/add_watchedlist", addToWatchedList);

router.put("/giveRating", giveRating);

router.delete("/remove_watchedlist", removeFromWatchedList);

module.exports = router;
