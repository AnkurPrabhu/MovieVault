const watchlist = require("../model/watchlist");

exports.getAllWtachList = async (req, res, next) => {
  const user_id = req.query.user;
  console.log(user_id);
  try {
    const list = await watchlist.fetchall(user_id);
    res.status(200).json(list);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addToWatchList = async (req, res, next) => {
  const { user_id, movie_id } = req.body;

  try {
    const list = await watchlist.addToWatchList(user_id, movie_id);
    res
      .status(200)
      .json({ Success: "succesfully added the movie to your watch list" });
  } catch (err) {
    return res.status(400).json({
      error: "Not a valid user",
    });
  }
  next();
};

exports.removeFromWatchList = async (req, res, next) => {
  const watchlist_id = req.query.body.watchlist_id;

  try {
    const list = await watchlist.removeFromWatchList(watchlist_id);
    res
      .status(200)
      .json({ Success: "succesfully removed the movie from your watch list" });
  } catch (err) {
    return res.status(400).json({
      error: "Not a valid user",
    });
  }
  next();
};
