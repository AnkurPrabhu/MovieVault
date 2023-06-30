const movies = require("../model/movies");

exports.getAllMovies = async (req, res, next) => {
  const page = req.query.page;

  try {
    const allmovies = await movies.fetchall(page);
    res.status(200).json(allmovies);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addMovie = async (req, res, next) => {
  const { title, director, description } = req.body;

  try {
    const addmovies = await movies.addmovie(title, director, description);
    res.status(200).json({ Success: "succesfully added movie" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.searchMovie = async (req, res, next) => {
  const page = req.query.page;
  const query = req.query.query;

  try {
    const search = await movies.searchMovie(query, page);
    res.status(200).json(search);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
