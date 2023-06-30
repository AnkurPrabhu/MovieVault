const watchedlist = require("../model/watchedlist");

exports.getAllWtachedList = async (req, res, next) => {
  const user_id = req.query.user;
  try {
    const list = await watchedlist.fetchall(user_id);
    res.status(200).json(list);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addToWatchedList = async (req, res, next) => {
  const { user_id, movie_id } = req.body;

  try {
    const list = await watchedlist.addToWatchedList(user_id, movie_id);
    res
      .status(200)
      .json({ Success: "succesfully added the movie to your watched list" });
  } catch (err) {
    return res.status(400).json({
      error: "Not a valid user",
    });
  }
  next();
};

exports.removeFromWatchedList = async (req, res, next) => {
  console.log(req.query);
  const watched_id = req.query.body.watched_id;

  try {
    const list = await watchedlist.removeFromWatchedList(watched_id);
    res.status(200).json({
      Success: "succesfully removed the movie from your already watched list",
    });
  } catch (err) {
    return res.status(400).json({
      error: "Not a valid user",
    });
  }
  next();
};

exports.giveRating = async (req, res, next) => {
  const { watched_id, rating, user_id } = req.body;

  try {
    const list = await watchedlist.setrating(watched_id, rating, user_id);
    res.status(200).json({
      Success: "succesfully removed the movie from your already watched list",
    });
  } catch (err) {
    return res.status(400).json({
      error: "Not a valid user",
    });
  }
  next();
};
